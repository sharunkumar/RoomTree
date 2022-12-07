import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const catalogRouter = router({
    getAllSpaces: publicProcedure
        .query(async ({ ctx }) => {
            return {
                spaces: await ctx.prisma.space.findMany({
                    include: {
                        location: true
                    }
                })
            };
        }),

    getSpaceById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return {
                space: await ctx.prisma.space.findFirst({
                    where: { id: input.id },
                    include: {
                        location: true
                    }
                })
            };
        }),

    getBookingsOfUser: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return {
                spaces: await ctx.prisma.bookedTimeSlot.findMany({
                    where: {
                        userId: input.id
                    },
                    include: {
                        space: true,
                        timeSlot: true,
                        bookedBy: true,
                    }
                })
            };
        }),

    getTimeSlots: publicProcedure
        .input(z.object({}).nullish())
        .query(async ({ ctx }) => {
            return {
                timeSlots: await ctx.prisma.timeSlot.findMany({})
            }
        })
});
