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
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcResult = exports.Result = void 0;
const type_graphql_1 = require("type-graphql");
let From = class From {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], From.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], From.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], From.prototype, "shouldHavePaid", void 0);
From = __decorate([
    (0, type_graphql_1.ObjectType)()
], From);
let To = class To {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], To.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], To.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], To.prototype, "amount", void 0);
To = __decorate([
    (0, type_graphql_1.ObjectType)()
], To);
let Transaction = class Transaction {
};
__decorate([
    (0, type_graphql_1.Field)(() => From),
    __metadata("design:type", From)
], Transaction.prototype, "from", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [To]),
    __metadata("design:type", Array)
], Transaction.prototype, "to", void 0);
Transaction = __decorate([
    (0, type_graphql_1.ObjectType)()
], Transaction);
let Result = class Result {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Result.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Result.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Result.prototype, "sumPrice", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Transaction]),
    __metadata("design:type", Array)
], Result.prototype, "transactions", void 0);
Result = __decorate([
    (0, type_graphql_1.ObjectType)()
], Result);
exports.Result = Result;
const calcAmountForRest = (amount, whoShouldPay) => {
    const defaultAmountPerPerson = amount / whoShouldPay.length;
    // ratio???1???????????????????????????
    const sumOfCustomAmount = whoShouldPay.reduce((prev, curr) => {
        if (curr.ratio === 1 || curr.ratio === null)
            return prev; // "????????????"???????????? ???????????????????????????????????????null???????????????
        return {
            sumAmount: prev.sumAmount + defaultAmountPerPerson * curr.ratio,
            sumParticipants: prev.sumParticipants + 1,
        };
    }, { sumAmount: 0, sumParticipants: 0 });
    const amountForRest = (amount - sumOfCustomAmount.sumAmount) /
        (whoShouldPay.length - sumOfCustomAmount.sumParticipants);
    return amountForRest;
};
const calcBalance = (event) => {
    let participantBalances = event.participants.map((participant) => ({
        id: participant.id,
        name: participant.name,
        balance: 0,
        shouldHavePaid: 0,
    }));
    event.payments.forEach((payment) => {
        // ??????????????????????????????????????????????????????????????????????????????????????????????????????
        // whoShouldPay???????????????????????????????????????????????????????????????
        const defaultAmountPerPerson = payment.amount / payment.whoShouldPay.length;
        const amountForRest = calcAmountForRest(payment.amount, payment.whoShouldPay);
        participantBalances = participantBalances.map((participantBalance) => {
            const newParticipantBalance = Object.assign({}, participantBalance);
            // ??????????????????????????????balance????????????????????????
            if (participantBalance.id === payment.whoPaid.id) {
                newParticipantBalance.balance += payment.amount;
            }
            // ?????????????????????????????????debt???????????????shouldHavePaid??????????????????????????????
            const personIndexToPay = payment.whoShouldPay.findIndex((el) => el.participantId === participantBalance.id);
            if (personIndexToPay > -1) {
                const ratio = payment.whoShouldPay[personIndexToPay].ratio;
                const appliesAmountForRest = ratio === 1 || ratio === null; // ???????????????????????????????????????null????????????
                newParticipantBalance.balance -= appliesAmountForRest
                    ? amountForRest
                    : defaultAmountPerPerson * ratio;
                newParticipantBalance.shouldHavePaid += appliesAmountForRest
                    ? amountForRest
                    : defaultAmountPerPerson * ratio;
            }
            return newParticipantBalance;
        });
    });
    // balance????????????????????????????????????????????????balance?????????????????????????????????
    participantBalances = participantBalances.map((participantBalance) => (Object.assign(Object.assign({}, participantBalance), { balance: Math.round(participantBalance.balance) })));
    return participantBalances;
};
const resolveBalance = (participantBalances) => {
    let transactions = participantBalances.map((participant) => ({
        from: {
            id: participant.id,
            name: participant.name,
            shouldHavePaid: Math.ceil(participant.shouldHavePaid),
        },
        to: [],
    }));
    let _participantBalances = [...participantBalances];
    while (true) {
        // sort participantBalances by descending order
        _participantBalances.sort((a, b) => b.balance - a.balance);
        const paidTooMuch = _participantBalances[0]; // ???????????????????????????
        const paidLess = _participantBalances[_participantBalances.length - 1]; // ???????????????????????????
        if (paidTooMuch.balance === 0 || paidLess.balance === 0)
            break;
        const transactionAmount = Math.min(paidTooMuch.balance, Math.abs(paidLess.balance));
        const indexOfWhoGetsRefunded = transactions.findIndex((transaction) => transaction.from.id === paidLess.id);
        // transactions???to????????????????????????????????????
        transactions[indexOfWhoGetsRefunded] = Object.assign(Object.assign({}, transactions[indexOfWhoGetsRefunded]), { to: [
                ...transactions[indexOfWhoGetsRefunded].to,
                {
                    id: paidTooMuch.id,
                    name: paidTooMuch.name,
                    amount: transactionAmount,
                },
            ] });
        _participantBalances[0].balance -= transactionAmount;
        _participantBalances[_participantBalances.length - 1].balance +=
            transactionAmount;
    }
    return transactions;
};
const calcResult = (event) => {
    var _a;
    // TODO: balance??????????????????????????????????????????????????????????????????????????????????????????
    // (?????????????????????????????????????????????????????????)
    const participantBalances = calcBalance(event);
    const transactions = resolveBalance(participantBalances);
    const result = {
        id: event.id,
        name: event.name,
        sumPrice: (_a = event.payments) === null || _a === void 0 ? void 0 : _a.reduce((acc, payment) => acc + payment.amount, 0),
        transactions,
    };
    return result;
};
exports.calcResult = calcResult;
