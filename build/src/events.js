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
exports.EventResolver = exports.Event = void 0;
const prisma_1 = __importDefault(require("../prisma/prisma"));
const type_graphql_1 = require("type-graphql");
const payments_1 = require("./payments");
const participants_1 = require("./participants");
const result_1 = require("./result");
let Event = class Event {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Event.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Event.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Event.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Event.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [payments_1.Payment]),
    __metadata("design:type", Array)
], Event.prototype, "payments", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Event.prototype, "sumPrice", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [participants_1.Participant]),
    __metadata("design:type", Array)
], Event.prototype, "participants", void 0);
Event = __decorate([
    (0, type_graphql_1.ObjectType)()
], Event);
exports.Event = Event;
let ParticipantForEventInput = class ParticipantForEventInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ParticipantForEventInput.prototype, "name", void 0);
ParticipantForEventInput = __decorate([
    (0, type_graphql_1.InputType)()
], ParticipantForEventInput);
let EventInput = class EventInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], EventInput.prototype, "eventName", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [ParticipantForEventInput]),
    __metadata("design:type", Array)
], EventInput.prototype, "participants", void 0);
EventInput = __decorate([
    (0, type_graphql_1.InputType)()
], EventInput);
let EventResolver = class EventResolver {
    events() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.event.findMany();
        });
    }
    event(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield prisma_1.default.event.findFirst({
                where: {
                    id: eventId,
                },
            });
            return event;
        });
    }
    result(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield prisma_1.default.event.findFirst({
                where: {
                    id: eventId,
                },
                select: {
                    id: true,
                    name: true,
                    participants: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    payments: {
                        select: {
                            id: true,
                            name: true,
                            amount: true,
                            whoPaid: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                            whoShouldPay: {
                                select: {
                                    participantId: true,
                                    ratio: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!event)
                throw new Error("Event not found");
            const result = (0, result_1.calcResult)(event);
            return result;
        });
    }
    createEvent(eventInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield prisma_1.default.event.create({
                data: {
                    name: eventInput.eventName,
                },
            });
            yield prisma_1.default.participant.createMany({
                data: eventInput.participants.map((participant) => ({
                    name: participant.name,
                    eventId: event.id,
                })),
            });
            return event;
        });
    }
    payments(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.payment.findMany({
                where: {
                    eventId: event.id,
                },
            });
        });
    }
    participants(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.participant.findMany({
                where: {
                    eventId: event.id,
                },
            });
        });
    }
    sumPrice(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const payments = yield prisma_1.default.payment.findMany({
                where: {
                    eventId: event.id,
                },
            });
            const sum = payments.reduce((acc, payment) => acc + payment.amount, 0);
            return sum;
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Event]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "events", null);
__decorate([
    (0, type_graphql_1.Query)(() => Event),
    __param(0, (0, type_graphql_1.Arg)("eventId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "event", null);
__decorate([
    (0, type_graphql_1.Query)(() => result_1.Result),
    __param(0, (0, type_graphql_1.Arg)("eventId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "result", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Event),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EventInput]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "createEvent", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "payments", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "participants", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "sumPrice", null);
EventResolver = __decorate([
    (0, type_graphql_1.Resolver)(Event)
], EventResolver);
exports.EventResolver = EventResolver;
