import { Module } from '@nestjs/common';
import { CashierSessionController } from './cashier-session.controller';
import { CashierSessionService } from './cashier-session.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CashierSession,
  CashierSessionSchema,
} from 'src/schemas/cashierSession/cashierSession';
import {
  OperatingPeriod,
  OperatingPeriodSchema,
} from 'src/schemas/operatingPeriod/operatingPeriod.schema';
import { OperatingPeriodService } from 'src/operating-period/operating-period.service';
import { User, UserSchema } from 'src/schemas/users.schema';
import CashWithdrawSchema, {
  CashWithdraw,
} from 'src/schemas/cashierSession/cashWithdraw';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CashierSession.name,
        schema: CashierSessionSchema,
      },
      {
        name: OperatingPeriod.name,
        schema: OperatingPeriodSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: CashWithdraw.name,
        schema: CashWithdrawSchema,
      },
    ]),
  ],
  controllers: [CashierSessionController],
  providers: [CashierSessionService, OperatingPeriodService],
})
export class CashierSessionModule {}
