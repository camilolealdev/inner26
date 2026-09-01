<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/pdf.php';
require_once __DIR__ . '/../vendor/phpmailer/src/Exception.php';
require_once __DIR__ . '/../vendor/phpmailer/src/PHPMailer.php';
require_once __DIR__ . '/../vendor/phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

function email_configured(): bool
{
    return (bool) (inner_spirit_env('SMTP_HOST') && inner_spirit_env('SMTP_USER') && inner_spirit_env('SMTP_PASS'));
}

function parse_email_from(string $value): array
{
    if (preg_match('/^(.*)<(.+)>$/', $value, $m)) {
        return [trim($m[2]), trim($m[1], " \t\"")];
    }
    return [$value, 'Inner Spirit Studio'];
}

function send_order_email(array $order): array
{
    if (!email_configured()) {
        return ['sent' => false, 'reason' => 'SMTP no configurado'];
    }

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = inner_spirit_env('SMTP_HOST');
        $mail->SMTPAuth = true;
        $mail->Username = inner_spirit_env('SMTP_USER');
        $mail->Password = inner_spirit_env('SMTP_PASS');
        $mail->Port = (int) inner_spirit_env('SMTP_PORT', '587');
        $mail->SMTPSecure = inner_spirit_env('SMTP_SECURE') === 'true'
            ? PHPMailer::ENCRYPTION_SMTPS
            : PHPMailer::ENCRYPTION_STARTTLS;
        $mail->CharSet = 'UTF-8';

        $fromRaw = inner_spirit_env('SMTP_FROM', 'hola@innerspirit.co');
        [$fromEmail, $fromName] = parse_email_from($fromRaw);
        $studioEmail = inner_spirit_env('STUDIO_NOTIFY_EMAIL', $fromEmail);

        $mail->setFrom($fromEmail, $fromName);
        $mail->addAddress($order['customer']['email']);
        $mail->addBCC($studioEmail);
        $mail->Subject = "Confirmacion Inner Spirit {$order['orderId']}";
        $mail->Body = implode("\n", build_receipt_text($order));
        $mail->isHTML(false);

        $pdf = build_order_pdf($order);
        $mail->addStringAttachment($pdf, "inner-spirit-{$order['orderId']}.pdf", 'base64', 'application/pdf');

        $mail->send();
        return ['sent' => true];
    } catch (PHPMailerException $e) {
        throw new RuntimeException('Error enviando email: ' . $mail->ErrorInfo);
    }
}
