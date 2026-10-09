<?php
declare(strict_types=1);

require_once __DIR__ . '/_lib/admin_auth.php';
require_once __DIR__ . '/../_lib/config.php';
require_once __DIR__ . '/../_lib/db.php';

header('X-Robots-Tag: noindex, nofollow');

admin_require_login();

$allowedStatuses = ['paid', 'pending_payment', 'failed', 'all'];
$statusFilter = (string) ($_GET['status'] ?? 'all');
if (!in_array($statusFilter, $allowedStatuses, true)) {
    $statusFilter = 'all';
}

// Toda la carga de datos va envuelta: si la DB/config falla, no queremos
// que un stack trace con host/paths se sirva al navegador (display_errors
// puede estar On en hosting compartido) — mismo criterio que checkout.php.
try {
    ensure_commerce_schema();
    $pdo = inner_spirit_pdo();

    // Una sola consulta (sin texto libre de usuario en el SQL): trae las
    // ordenes de los 3 estados relevantes, topada en 200 filas ("sistema
    // sencillo", sin paginacion). Los stats de arriba se calculan sobre
    // ESTE mismo resultado completo (no sobre el filtrado), para que los
    // totales no "desaparezcan" cuando el filtro de abajo cambia; el
    // filtro de ?status= solo decide que filas se MUESTRAN en la tabla.
    $stmt = $pdo->prepare("
        SELECT * FROM orders
        WHERE status IN ('paid', 'pending_payment', 'failed')
        ORDER BY created_at DESC
        LIMIT 200
    ");
    $stmt->execute();
    $orders = $stmt->fetchAll();

    $itemsByOrder = [];
    if ($orders) {
        $ids = array_column($orders, 'id');
        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        $itemsStmt = $pdo->prepare("SELECT * FROM order_items WHERE order_id IN ($placeholders) ORDER BY id");
        $itemsStmt->execute($ids);
        foreach ($itemsStmt->fetchAll() as $item) {
            $itemsByOrder[$item['order_id']][] = $item;
        }
    }

    $paidOrdersCount = 0;
    $paidRevenue = 0;
    $paidTicketCount = 0;
    foreach ($orders as $order) {
        if ($order['status'] === 'paid') {
            $paidOrdersCount++;
            $paidRevenue += (int) $order['total_amount'];
            foreach ($itemsByOrder[$order['id']] ?? [] as $item) {
                if ($item['item_type'] === 'event') {
                    $paidTicketCount += (int) $item['quantity'];
                }
            }
        }
    }

    $visibleOrders = $statusFilter === 'all'
        ? $orders
        : array_values(array_filter($orders, static fn($o) => $o['status'] === $statusFilter));
} catch (Throwable $e) {
    error_log('[admin/dashboard] ' . $e->getMessage());
    http_response_code(500);
    echo '<!DOCTYPE html><html lang="es"><body>'
       . '<p>No se pudo cargar el panel. Intenta de nuevo en unos minutos.</p>'
       . '</body></html>';
    exit;
}

function admin_status_badge(string $status): string
{
    $map = [
        'paid' => ['Pagado', '#166534', '#dcfce7'],
        'pending_payment' => ['Pendiente', '#92400e', '#fef3c7'],
        'failed' => ['Fallido', '#991b1b', '#fee2e2'],
    ];
    [$label, $fg, $bg] = $map[$status] ?? [$status, '#374151', '#e5e7eb'];
    return '<span class="badge" style="color:' . $fg . ';background:' . $bg . ';">'
        . htmlspecialchars($label, ENT_QUOTES, 'UTF-8') . '</span>';
}

function admin_format_cop($amount): string
{
    return number_format((float) $amount, 0, ',', '.') . ' COP';
}

$e = static fn($v) => htmlspecialchars((string) $v, ENT_QUOTES, 'UTF-8');

$filters = [
    'all' => 'Todas',
    'paid' => 'Pagadas',
    'pending_payment' => 'Pendientes',
    'failed' => 'Fallidas',
];
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ventas de tickets - Inner Spirit Studio</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: #f5f3ff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1f2937;
    padding: 16px;
  }
  .wrap { max-width: 1000px; margin: 0 auto; }
  header.page {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 20px;
  }
  header.page h1 { margin: 0; font-size: 1.4rem; }
  a.logout {
    color: #6d28d9;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 600;
  }
  a.logout:hover { text-decoration: underline; }

  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
    margin-bottom: 20px;
  }
  .stat {
    background: #fff;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 4px 14px rgba(31, 41, 55, 0.08);
  }
  .stat .label {
    font-size: 0.8rem;
    color: #6b7280;
    margin-bottom: 6px;
  }
  .stat .value {
    font-size: 1.6rem;
    font-weight: 700;
    color: #4c1d95;
  }

  form.filters {
    margin-bottom: 16px;
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  }
  form.filters label { font-size: 0.85rem; color: #374151; }
  form.filters select {
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    font-size: 0.9rem;
  }
  form.filters button {
    padding: 8px 14px;
    border: none;
    border-radius: 8px;
    background: #6d28d9;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
  }

  .orders { display: flex; flex-direction: column; gap: 12px; }
  .order-card {
    background: #fff;
    border-radius: 12px;
    padding: 14px 16px;
    box-shadow: 0 4px 14px rgba(31, 41, 55, 0.08);
  }
  .order-top {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 8px;
  }
  .order-id {
    font-weight: 700;
    font-size: 0.95rem;
  }
  .order-date {
    font-size: 0.8rem;
    color: #6b7280;
  }
  .badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
  }
  .order-customer {
    font-size: 0.9rem;
    margin-bottom: 4px;
  }
  .order-customer .email { color: #6b7280; }
  .order-meta {
    font-size: 0.8rem;
    color: #6b7280;
    margin-bottom: 8px;
  }
  .order-total {
    font-weight: 700;
    color: #166534;
  }
  ul.items {
    list-style: none;
    margin: 8px 0 0;
    padding: 0;
    border-top: 1px dashed #e5e7eb;
    padding-top: 8px;
  }
  ul.items li {
    font-size: 0.85rem;
    margin-bottom: 4px;
  }
  .tag-ticket {
    display: inline-block;
    background: #ede9fe;
    color: #5b21b6;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 4px;
    margin-right: 6px;
    letter-spacing: 0.04em;
  }
  .item-details {
    color: #6b7280;
    font-size: 0.8rem;
  }
  .empty {
    text-align: center;
    color: #6b7280;
    padding: 40px 0;
  }

  @media (max-width: 480px) {
    .order-top { flex-direction: column; }
  }
</style>
</head>
<body>
<div class="wrap">
  <header class="page">
    <h1>Ventas de tickets</h1>
    <a class="logout" href="logout.php">Cerrar sesion</a>
  </header>

  <div class="stats">
    <div class="stat">
      <div class="label">Ordenes pagadas</div>
      <div class="value"><?= $e($paidOrdersCount) ?></div>
    </div>
    <div class="stat">
      <div class="label">Ingresos (pagado)</div>
      <div class="value"><?= $e(admin_format_cop($paidRevenue)) ?></div>
    </div>
    <div class="stat">
      <div class="label">Tickets vendidos (pagado)</div>
      <div class="value"><?= $e($paidTicketCount) ?></div>
    </div>
  </div>

  <form class="filters" method="get" action="dashboard.php">
    <label for="status">Estado:</label>
    <select id="status" name="status">
      <?php foreach ($filters as $value => $label): ?>
        <option value="<?= $e($value) ?>" <?= $statusFilter === $value ? 'selected' : '' ?>><?= $e($label) ?></option>
      <?php endforeach; ?>
    </select>
    <button type="submit">Filtrar</button>
  </form>

  <div class="orders">
    <?php if (!$visibleOrders): ?>
      <div class="empty">No hay ordenes para este filtro.</div>
    <?php endif; ?>

    <?php foreach ($visibleOrders as $order): ?>
      <?php
        $createdAt = $order['created_at'] ? date('d/m/Y H:i', strtotime($order['created_at'])) : '-';
        $items = $itemsByOrder[$order['id']] ?? [];
      ?>
      <div class="order-card">
        <div class="order-top">
          <div>
            <div class="order-id"><?= $e($order['id']) ?></div>
            <div class="order-date"><?= $e($createdAt) ?></div>
          </div>
          <div><?= admin_status_badge($order['status']) ?></div>
        </div>
        <div class="order-customer">
          <?= $e($order['customer_name']) ?> &mdash; <span class="email"><?= $e($order['customer_email']) ?></span>
        </div>
        <div class="order-meta">
          Proveedor: <?= $e($order['provider']) ?>
          &nbsp;&middot;&nbsp;
          Total: <span class="order-total"><?= $e(admin_format_cop($order['total_amount'])) ?></span>
        </div>
        <?php if ($items): ?>
          <ul class="items">
            <?php foreach ($items as $item): ?>
              <li>
                <?php if ($item['item_type'] === 'event'): ?>
                  <span class="tag-ticket">TICKET</span>
                <?php endif; ?>
                <?= $e($item['quantity']) ?>x <?= $e($item['title']) ?>
                <?php if (!empty($item['details'])): ?>
                  <span class="item-details">(<?= $e($item['details']) ?>)</span>
                <?php endif; ?>
              </li>
            <?php endforeach; ?>
          </ul>
        <?php endif; ?>
      </div>
    <?php endforeach; ?>
  </div>
</div>
</body>
</html>
