import { PaymentsOnParticipants } from "@prisma/client";
import {
  ObjectType,
  Field,
  ID,
  Resolver,
  Int,
  Float,
  Query,
  Arg,
  Args,
  FieldResolver,
  Root,
  Mutation,
  InputType,
  ArgsType,
} from "type-graphql";
import prisma from "../prisma/prisma";
import { Participant } from "./participants";

@ObjectType()
export class Payment {
  @Field(() => Int!)
  id!: number;

  @Field(() => String!)
  name!: string;

  @Field(() => Int!)
  whoPaidId!: number;

  @Field(() => Participant!, { nullable: true })
  whoPaid?: Participant;

  @Field(() => [WhoShouldPayOutput!]!, { nullable: true })
  whoShouldPay?: WhoShouldPayOutput[];

  @Field(() => Int!)
  amount!: number;

  @Field(() => ID!)
  eventId!: string;

  @Field(() => Date!)
  createdAt!: Date;

  @Field(() => Date!)
  updatedAt!: Date;
}

@InputType()
export class WhoShouldPayInput {
  @Field(() => Int!)
  participantId!: number;

  @Field(() => Float!)
  ratio!: number;
}

@InputType()
export class AddPaymentInput {
  @Field(() => String!)
  name!: string;

  @Field(() => Int!)
  whoPaidId!: number;

  @Field(() => [WhoShouldPayInput!]!)
  whoShouldPay!: WhoShouldPayInput[];

  @Field(() => Int!)
  amount!: number;

  @Field(() => String!)
  eventId!: string;
}

@ArgsType()
class DeletePaymentArgs {
  @Field(() => Int!)
  paymentId!: number;
}

@ObjectType()
class getCountOutput {
  @Field(() => Int!)
  count!: number;
}

@ObjectType()
class WhoShouldPayOutput extends Participant {
  @Field(() => Float)
  ratio!: number | null;
}

@Resolver(Payment)
export class PaymentResolver {
  @Query(() => [Payment])
  async payments(@Arg("eventId") eventId: string): Promise<Payment[]> {
    return await prisma.payment.findMany({
      where: {
        eventId,
      },
    });
  }
  @Query(() => Payment)
  async payment(@Arg("paymentId") paymentId: number): Promise<Payment> {
    console.log(paymentId);
    const payment = await prisma.payment.findUnique({
      where: {
        id: paymentId,
      },
    });
    if (!payment) throw new Error("payment not found");
    return payment;
  }

  @Query(() => getCountOutput)
  async getCount(@Arg("eventId") eventId: string): Promise<{ count: number }> {
    const count = await prisma.payment.count({
      where: {
        eventId,
      },
    });
    return { count };
  }

  @Mutation(() => Payment)
  async addPayment(
    @Arg("input") addPaymentInput: AddPaymentInput
  ): Promise<{ id: number }> {
    const payment = await prisma.payment.create({
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
  }

  @Mutation(() => Payment)
  async deletePayment(
    @Args() { paymentId }: DeletePaymentArgs
  ): Promise<{ id: number }> {
    const payment = await prisma.payment.delete({
      where: {
        id: paymentId,
      },
    });

    return { id: payment.id };
  }

  @FieldResolver()
  async whoShouldPay(@Root() payment: Payment): Promise<WhoShouldPayOutput[]> {
    const whoShouldPay = await prisma.payment
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
    if (!whoShouldPay) throw new Error("whoShouldPay not found");

    const res = whoShouldPay.map((el) => {
      return {
        ...el.participant,
        ratio: el.ratio,
      };
    });
    console.log(res);

    return res;
  }

  @FieldResolver()
  async whoPaid(@Root() payment: Payment): Promise<Participant> {
    const whoPaid = await prisma.participant.findUnique({
      where: {
        id: payment.whoPaidId,
      },
    });
    if (!whoPaid) throw new Error("whoPaid not found");
    return whoPaid;
  }
}
