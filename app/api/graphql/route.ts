// pages/api/route.ts

import { createYoga } from 'graphql-yoga'
import { schema } from '@/lib/graphql/schema'
import {createContext} from "@/lib/graphql/context";


const { handleRequest } =  createYoga({
    schema,
    context: createContext,
    graphqlEndpoint: '/api/graphql',
    fetchAPI: {
        Request: Request,
        Response: Response,
    }
})

export { handleRequest as GET, handleRequest as POST }