
import HeaderBox from "@/components/Header/HeaderBox";

const Home = () => {
    const loggedIn = {firstName:'xtc'}



    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedIn?.firstName || 'Guest'}
                        subtext="Access and manage your account and transactions efficently"
                    />
                </header>
            </div>
        </section>
    )
}

export default Home

/*
* 33:07
*
* */