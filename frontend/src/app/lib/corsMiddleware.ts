import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
    "https://www.hostIt.events",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",

];

export function withCors(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async function(req: NextRequest) {
    const origin = req.headers.get("origin");
    
    const allowedPatterns = [
      /^https:\/\/.*\.crowdpassevents\.com$/,
      /^http:\/\/localhost:\d+$/,        
    ];
    
    const isAllowed = origin && (
      ALLOWED_ORIGINS.includes(origin) || 
      allowedPatterns.some(pattern => pattern.test(origin))
    );

    if (req.method === "OPTIONS") {
      const response = new NextResponse(null, { status: 200 });
      
      if (isAllowed) {
        response.headers.set("Access-Control-Allow-Origin", origin);
      }
      
      response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
      response.headers.set("Access-Control-Max-Age", "86400");
      response.headers.set("Access-Control-Allow-Credentials", "true");
      
      return response;
    }

    const response = await handler(req);
    
    if (isAllowed) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    }
    
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    response.headers.set("Access-Control-Allow-Credentials", "true");
    
    return response;
  };
}