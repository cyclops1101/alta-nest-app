import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [UserModule, InvoiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
