
import HeaderBox from "@/components/Header/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox/TotalBalanceBox";

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

                    <TotalBalanceBox
                        accounts={[]}
                        totalBanks={5}
                        totalCurrentBalance={2500}
                    />
                </header>
            </div>
        </section>
    )
}

export default Home
