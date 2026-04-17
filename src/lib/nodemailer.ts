import nodemailer from "nodemailer";

const email = process.env.GMAIL;
const pass = process.env.GMAIL_PASS;

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use TLS
  auth: {
    user: email,
    pass,
  },
});

export const mailOptions = {
  from: email,
};

/**
 * Sends an email notification to the admin when a new quotation request is made.
 */
export const sendAdminNotification = async (userName: string, userEmail: string, message: string) => {
  try {
    await transporter.sendMail({
      ...mailOptions,
      to: email, // Admin's email (same as sender in this case)
      subject: `New Quotation Request from ${userName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #D4AF37;">New Quotation Request</h2>
          <p><strong>Customer Name:</strong> ${userName}</p>
          <p><strong>Customer Email:</strong> ${userEmail}</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #D4AF37;">
            <p style="margin: 0;"><strong>Message:</strong></p>
            <p style="margin-top: 10px;">${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #777;">This is an automated notification from your Architect App.</p>
        </div>
      `,
    });
    console.log("Admin notification email sent");
  } catch (error) {
    console.error("Error sending admin notification email:", error);
  }
};

/**
 * Sends the official quotation to the customer.
 */
export const sendCustomerQuotation = async (
  customerEmail: string, 
  customerName: string, 
  items: any[], 
  totalAmount: number,
  notes?: string,
  customFields?: { label: string; value: string }[]
) => {
  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.description}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.rate.toLocaleString()}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.amount.toLocaleString()}</td>
    </tr>
  `).join("");

  const customFieldsHtml = customFields && customFields.length > 0 
    ? `
      <div style="margin-top: 20px; padding: 15px; background-color: #f0f4f8; border-radius: 8px;">
        <p style="margin: 0 0 10px 0; font-weight: bold; color: #2c3e50;">Additional Details:</p>
        <table style="width: 100%; font-size: 14px;">
          ${customFields.map(cf => `
            <tr>
              <td style="padding: 4px 0; color: #7f8c8d; width: 40%; font-weight: 500;">${cf.label}:</td>
              <td style="padding: 4px 0; color: #34495e;">${cf.value}</td>
            </tr>
          `).join("")}
        </table>
      </div>
    `
    : "";

  try {
    await transporter.sendMail({
      ...mailOptions,
      to: customerEmail,
      subject: `Official Quotation - Architect App`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 12px;">
          <h2 style="color: #D4AF37; text-align: center;">OFFICIAL QUOTATION</h2>
          <p>Dear <strong>${customerName}</strong>,</p>
          <p>Thank you for your interest in our services. Please find the details of your quotation below:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <thead>
              <tr style="background-color: #f8f8f8;">
                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #D4AF37;">Description</th>
                <th style="padding: 10px; text-align: right; border-bottom: 2px solid #D4AF37;">Qty</th>
                <th style="padding: 10px; text-align: right; border-bottom: 2px solid #D4AF37;">Rate</th>
                <th style="padding: 10px; text-align: right; border-bottom: 2px solid #D4AF37;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="padding: 15px 10px; text-align: right; font-weight: bold;">Grand Total:</td>
                <td style="padding: 15px 10px; text-align: right; font-weight: bold; color: #D4AF37; font-size: 1.2em;">₹${totalAmount.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>

          ${customFieldsHtml}

          ${notes ? `
          <div style="margin-top: 20px; padding: 15px; background-color: #fff9e6; border-radius: 8px;">
            <p style="margin: 0; font-weight: bold; color: #856404;">Notes:</p>
            <p style="margin-top: 5px; font-style: italic;">${notes}</p>
          </div>
          ` : ""}

          <p style="margin-top: 30px;">If you have any questions, feel free to contact us.</p>
          <p>Best Regards,<br><strong>Architect App Team</strong></p>
        </div>
      `,
    });
    console.log("Customer quotation email sent");
  } catch (error) {
    console.error("Error sending customer quotation email:", error);
  }
};

/**
 * Sends a professional reframed response to the customer.
 */
export const sendReframedResponse = async (
  customerEmail: string,
  customerName: string,
  originalMessage: string,
  reframedMessage: string
) => {
  try {
    await transporter.sendMail({
      ...mailOptions,
      to: customerEmail,
      subject: `Response to your Inquiry - Aesthetica Architectural Studio`,
      html: `
        <div style="font-family: 'Playfair Display', serif; padding: 40px; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 24px; background-color: #fff;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #999; font-weight: 200; letter-spacing: 0.2em; margin-bottom: 5px; font-size: 24px;">AESTHETICA</h1>
            <p style="color: #D4AF37; font-size: 10px; font-weight: bold; letter-spacing: 0.3em; margin: 0; text-transform: uppercase;">Architectural Studio</p>
          </div>
          
          <div style="margin-bottom: 30px; border-bottom: 1px solid #f5f5f5; pb-30px;">
            <p style="font-size: 16px; line-height: 1.6; color: #444;">Dear <strong>${customerName}</strong>,</p>
            <p style="font-size: 16px; line-height: 1.6; color: #444; font-weight: 300;">
              Thank you for reaching out to us. We have reviewed your inquiry and prepared a professional response for your consideration.
            </p>
          </div>

          <div style="background-color: #FDFBF7; padding: 25px; border-radius: 16px; border-left: 4px solid #D4AF37; margin-bottom: 30px;">
            <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #555; font-style: italic;">
              "${reframedMessage}"
            </p>
          </div>

          <div style="margin-top: 40px; border-top: 1px solid #f5f5f5; pt-20px;">
            <p style="font-size: 14px; line-height: 1.6; color: #666; font-weight: 300;">
              Our team is currently evaluating the specific details of your request. One of our lead architects will contact you shortly to discuss the next steps.
            </p>
            <p style="margin-top: 30px; font-size: 15px; color: #333;">
              Best Regards,<br>
              <strong style="color: #D4AF37;">Aesthetica Design Team</strong>
            </p>
          </div>

          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="font-size: 11px; color: #aaa; text-transform: uppercase; letter-spacing: 0.1em;">
              This is a response to your original message: "${originalMessage.substring(0, 50)}${originalMessage.length > 50 ? '...' : ''}"
            </p>
          </div>
        </div>
      `,
    });
    console.log("Reframed response email sent to customer");
  } catch (error) {
    console.error("Error sending reframed response email:", error);
    throw error;
  }
};
