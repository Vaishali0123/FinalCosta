
function handle_newsletter_submission() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email'])) {
        $email = sanitize_email($_POST['email']);
        if (is_email($email)) {
            // Send email notification
            wp_mail('info@costaricaninsurance.com', 'New Newsletter Subscription', 'New email: ' . $email);
            wp_send_json_success(['message' => 'Subscription successful!']);
        } else {
            wp_send_json_error(['message' => 'Invalid email address.']);
        }
    }
    wp_send_json_error(['message' => 'Invalid request']);
}
add_action('wp_ajax_nopriv_newsletter_submission', 'handle_newsletter_submission');
add_action('wp_ajax_newsletter_submission', 'handle_newsletter_submission');
