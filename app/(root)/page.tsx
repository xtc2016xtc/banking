
import HeaderBox from "@/components/Header/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox/TotalBalanceBox";
// 问候
function getGreetingBasedOnTime(): string {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 7 && hours < 11) {
        return "早上好";
    } else if (hours >= 11 && hours < 14) {
        return "中午好";
    } else if (hours >= 14 && hours < 17) {
        return "下午好";
    } else {
        return "晚上好";
    }
}

const Home = () => {

    const loggedIn = {firstName:'熊先生'}
    const title = getGreetingBasedOnTime();

    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title={title}
                        user={loggedIn?.firstName || 'Guest'}
                        subtext="银行交易平台"
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
