const paymentConfirmationTemplate = ({
  name,
  amount,
  moduleName,
  transactionNumber,
  paymentDate,
}) => `
<div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 32px 20px; color: #1f2937;">
  <div style="background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 12px; padding: 28px;">
    <h2 style="margin: 0 0 16px; color: #111827;">Payment confirmed ✅</h2>

    <p style="margin: 0 0 12px; font-size: 16px;">Hi ${name},</p>

    <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.6;">
      Your ${moduleName} payment has been successfully captured.
    </p>

    <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 18px 16px; margin-bottom: 20px;">
      <p style="margin: 0 0 8px;"><strong>Transaction ID:</strong> ${transactionNumber}</p>
      <p style="margin: 0 0 8px;"><strong>Amount:</strong> ₹${Number(amount).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      <p style="margin: 0;"><strong>Paid on:</strong> ${new Date(paymentDate).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</p>
    </div>

    <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #4b5563;">
      Thanks for choosing Parikrama. We look forward to serving you.
    </p>
  </div>
</div>
`;

export default paymentConfirmationTemplate;
