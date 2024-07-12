import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Branch } from 'src/schemas/business/branchSchema';
import { Business } from 'src/schemas/business/businessSchema';
import { LicenseKey } from 'src/schemas/business/licenseKeySchema';
import { emailTemplate } from './html/email.template';
import brevo from '@getbrevo/brevo';

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Business.name) private businessModel: Model<Business>,
    @InjectModel(Branch.name) private branchModel: Model<Branch>,
    @InjectModel(LicenseKey.name) private licenseKeyModel: Model<LicenseKey>,
  ) {}

  private async sendMail() {
    const businessEx = {
      name: 'Tomate Taqueria',
      email: 'moisesbaldenegromelendez@gmail.com',
      password: 'xS3sGszZsF6',
    };
    const htmlContent = emailTemplate(businessEx);

    const apiInstance = new brevo.TransactionalEmailsApi();
    console.log(apiInstance);

    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      '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',
    );

    const sendEmail = new brevo.SendSmtpEmail();
    sendEmail.subject = 'Confirmacion: Bienvenido a TomateSoft';
    sendEmail.to = [{ email: 'mc.moisesm16@gmail.com', name: businessEx.name }];
    sendEmail.htmlContent = htmlContent;
    sendEmail.sender = {
      name: 'TomateSOft-POS',
      email: 'no-reply@tomatesoft.com',
    };

    const emailResponse = await apiInstance.sendTransacEmail(sendEmail);
    console.log(emailResponse);
    return emailResponse;
  }

  async createBusiness(business: any) {
    const res = this.sendMail();
    return res;
  }
}