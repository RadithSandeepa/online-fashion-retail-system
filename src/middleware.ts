import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'


const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/']);
const isAdminRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware((auth, req) => {

  if (!isPublicRoute(req)) {
    auth().protect()
  }
  
  const { has, redirectToSignIn } = auth();
  console.log('has', has({permission: 'org:sys_memberships:manage'}))

  // if (isAdminRoute(req)) {
  //   auth().protect((has) => {
  //     console.log('has', has({ role: 'Admin' }))
  //     return (
  //       has({ role: 'org:admin' })
  //     )
  //   })
  // }

})


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
