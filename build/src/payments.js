"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentResolver = exports.AddPaymentInput = exports.WhoShouldPayInput = exports.Payment = void 0;
const type_graphql_1 = require("type-graphql");
const prisma_1 = __importDefault(require("../prisma/prisma"));
const participants_1 = require("./participants");
let Payment = class Payment {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Payment.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Payment.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Payment.prototype, "whoPaidId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => participants_1.Participant, { nullable: true }),
    __metadata("design:type", participants_1.Participant)
], Payment.prototype, "whoPaid", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [WhoShouldPayOutput], { nullable: true }),
    __metadata("design:type", Array)
], Payment.prototype, "whoShouldPay", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Payment.prototype, "amount", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Payment.prototype, "eventId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Payment.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Payment.prototype, "updatedAt", void 0);
Payment = __decorate([
    (0, type_graphql_1.ObjectType)()
], Payment);
exports.Payment = Payment;
let WhoShouldPayInput = class WhoShouldPayInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], WhoShouldPayInput.prototype, "participantId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], WhoShouldPayInput.prototype, "ratio", void 0);
WhoShouldPayInput = __decorate([
    (0, type_graphql_1.InputType)()
], WhoShouldPayInput);
exports.WhoShouldPayInput = WhoShouldPayInput;
let AddPaymentInput = class AddPaymentInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], AddPaymentInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], AddPaymentInput.prototype, "whoPaidId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [WhoShouldPayInput]),
    __metadata("design:type", Array)
], AddPaymentInput.prototype, "whoShouldPay", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], AddPaymentInput.prototype, "amount", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], AddPaymentInput.prototype, "eventId", void 0);
AddPaymentInput = __decorate([
    (0, type_graphql_1.InputType)()
], AddPaymentInput);
exports.AddPaymentInput = AddPaymentInput;
let DeletePaymentArgs = class DeletePaymentArgs {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], DeletePaymentArgs.prototype, "paymentId", void 0);
DeletePaymentArgs = __decorate([
    (0, type_graphql_1.ArgsType)()
], DeletePaymentArgs);
let getCountOutput = class getCountOutput {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], getCountOutput.prototype, "count", void 0);
getCountOutput = __decorate([
    (0, type_graphql_1.ObjectType)()
], getCountOutput);
let WhoShouldPayOutput = class WhoShouldPayOutput extends participants_1.Participant {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float),
    __metadata("design:type", Object)
], WhoShouldPayOutput.prototype, "ratio", void 0);
WhoShouldPayOutput = __decorate([
    (0, type_graphql_1.ObjectType)()
], WhoShouldPayOutput);
let PaymentResolver = class PaymentResolver {
    payments(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.payment.findMany({
                where: {
                    eventId,
                },
            });
        });
    }
    payment(paymentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = yield prisma_1.default.payment.findUnique({
                where: {
                    id: paymentId,
                },
            });
            if (!payment)
                throw new Error("payment not found");
            return payment;
        });
    }
    getCount(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield prisma_1.default.payment.count({
                where: {
                    eventId,
                },
            });
            return { count };
        });
    }
    addPayment(addPaymentInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = yield prisma_1.default.payment.create({
                data: {
                    eventId: addPaymentInput.eventId,
                    whoPaidId: addPaymentInput.whoPaidId,
                    amount: addPaymentInput.amount,
                    name: addPaymentInput.name,
                    whoShouldPay: {
                        create: addPaymentInput.whoShouldPay,
                    },
                },
            });
            return { id: payment.id };
        });
    }
    deletePayment({ paymentId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = yield prisma_1.default.payment.delete({
                where: {
                    id: paymentId,
                },
            });
            return { id: payment.id };
        });
    }
    whoShouldPay(payment) {
        return __awaiter(this, void 0, void 0, function* () {
            const whoShouldPay = yield prisma_1.default.payment
                .findUnique({
                where: {
                    id: payment.id,
                },
            })
                .whoShouldPay({
                select: {
                    participant: true,
                    ratio: true,
                },
            });
            if (!whoShouldPay)
                throw new Error("whoShouldPay not found");
            const res = whoShouldPay.map((el) => {
                return Object.assign(Object.assign({}, el.participant), { ratio: el.ratio });
            });
            console.log(res);
            return res;
        });
    }
    whoPaid(payment) {
        return __awaiter(this, void 0, void 0, function* () {
            const whoPaid = yield prisma_1.default.participant.findUnique({
                where: {
                    id: payment.whoPaidId,
                },
            });
            if (!whoPaid)
                throw new Error("whoPaid not found");
            return whoPaid;
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Payment]),
    __param(0, (0, type_graphql_1.Arg)("eventId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "payments", null);
__decorate([
    (0, type_graphql_1.Query)(() => Payment),
    __param(0, (0, type_graphql_1.Arg)("paymentId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "payment", null);
__decorate([
    (0, type_graphql_1.Query)(() => getCountOutput),
    __param(0, (0, type_graphql_1.Arg)("eventId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "getCount", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Payment),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddPaymentInput]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "addPayment", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Payment),
    __param(0, (0, type_graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DeletePaymentArgs]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "deletePayment", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Payment]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "whoShouldPay", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Payment]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "whoPaid", null);
PaymentResolver = __decorate([
    (0, type_graphql_1.Resolver)(Payment)
], PaymentResolver);
exports.PaymentResolver = PaymentResolver;
