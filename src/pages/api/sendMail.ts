import { createTransport } from "nodemailer";

const asyncs = async (
  req: { body: any },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { success: boolean }): void; new (): any };
    };
  }
) => {
  const transporter = createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    subject:
      req.body.mailName + "様（" + req.body.mailFrom + "）からお問い合わせ",
    text: req.body.mailTxt,
  });

  res.status(200).json({
    success: true,
  });
};
export default asyncs;
