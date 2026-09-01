<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/email.php';

function fulfill_paid_order(string $orderId, ?string $providerReference = null): array
{
    mark_order_status($orderId, 'paid', $providerReference);
    $order = get_order_by_id($orderId);
    $claimed = record_email_delivery($orderId, 'confirmation', 'processing');
    if (!$claimed) {
        return ['order' => $order, 'email' => ['sent' => false, 'reason' => 'Email ya procesado']];
    }

    try {
        $email = send_order_email($order);
        update_email_delivery(
            $orderId,
            'confirmation',
            $email['sent'] ? 'sent' : 'skipped',
            $email['sent'] ? null : ($email['reason'] ?? null)
        );
        return ['order' => $order, 'email' => $email];
    } catch (Throwable $e) {
        update_email_delivery($orderId, 'confirmation', 'failed', $e->getMessage());
        throw $e;
    }
}
