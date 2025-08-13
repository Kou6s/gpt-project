import { Link,Outlet } from "react-router-dom";
import "./RootLayout.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}


const RootLayout = () => {
    return (
   <ClerkProvider publishableKey={PUBLISHABLE_KEY}>

        <div className="rootlayout">
            <header> 
                <Link to="/" className="kat">

                <img src="/kat.png" alt="" />
                <span>KAT GPT</span>
                </Link>

<div className="user"> 
    
      <SignedIn>
        <UserButton/>
      </SignedIn>
       </div>


            </header>
<main>
    <Outlet/>
</main>


            </div>

</ClerkProvider>

    );
};
export default RootLayout;