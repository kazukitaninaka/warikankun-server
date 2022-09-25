"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        //   const test = await prisma.payment.create({
        //     data: {
        //       eventId: '4d13f0e5-a25a-4537-9590-b6ec98cfc4ac',
        //       name: 'コンビニ',
        //       amount: 1000,
        //       whoPaidId: 1,
        //     },
        //   });
        //   const test = await prisma.participant.createMany({
        //     data: [
        //       {
        //         name: 'John',
        //         eventId: '4d13f0e5-a25a-4537-9590-b6ec98cfc4ac',
        //       },
        //       {
        //         name: 'Abby',
        //         eventId: '4d13f0e5-a25a-4537-9590-b6ec98cfc4ac',
        //       },
        //       {
        //         name: 'Tom',
        //         eventId: '4d13f0e5-a25a-4537-9590-b6ec98cfc4ac',
        //       },
        //     ],
        //   });
        // const test = await prisma.payment.create({
        //   data: {
        //     eventId: '4d13f0e5-a25a-4537-9590-b6ec98cfc4ac',
        //     name: 'コンビニ',
        //     whoPaidId: 1,
        //     amount: 3000,
        //     whoShouldPay: {
        //       create: [
        //         { participantId: 1, ratio: 1 },
        //         { participantId: 2, ratio: 1 },
        //         { participantId: 3, ratio: 1 },
        //       ],
        //     },
        //   },
        // });
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
