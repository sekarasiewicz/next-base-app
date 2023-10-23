// pages/api/page.tsx

import { createYoga } from 'graphql-yoga'
import { schema } from '@/lib/graphql/schema'
import { createContext } from "@/lib/graphql/context";
import { NextResponse } from "next/server";


const { handleRequest } =  createYoga({
    schema,
    context: createContext,
    graphqlEndpoint: '/api/graphql',
    fetchAPI: {
        Request: Request,
        Response: NextResponse,
    }
})

export { handleRequest as GET, handleRequest as POST }
