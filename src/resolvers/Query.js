import { getUserId } from '../utils'

const Query = {
    hello: (parent, args, ctx, info) => {
        const { name } = args
        return `hello ${ name || 'world'}`
    },
    quantity: () => 1,
    user: (parent, { id }, { request, prisma }, info) => {
        const userId = getUserId(request)
        
        if(!id) {
            return prisma.users.findMany()
        }
        return prisma.users.findUnique({
            where: {
                id,
            }
        })
    },
    author: (parent, { id, take, skip, orderBy }, { request, prisma }, info) => {
        const userId = getUserId(request)
        
        if (!id) {
            return prisma.authors.findMany({
                take,
                skip,
                orderBy
            })
        }
        return prisma.authors.findUnique({
            where: {
                id,
            }
        })
    },
    book: (parent, { id, take, skip, orderBy }, { request, prisma }, info) => {
        const userId = getUserId(request)
        
        if(!id) {
            return prisma.books.findMany({
                take,
                skip,
                orderBy
            })
        }
        return prisma.books.findUnique({
            where: {
                id,
            }
        })
    }
}

export default Query