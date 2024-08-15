
import HeaderBox from "@/components/Header/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox/TotalBalanceBox";
import RightSidebar from "@/components/right/RightSidebar";
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

    const loggedIn = {firstName:'熊',lastName: '先生',email:'728611827@qq.com'}
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

                RECENT TRANSACTIONS
            </div>
            {/*@ts-ignore*/}
            <RightSidebar user={loggedIn} transactions={[]} banks={[{currentBalance:154},{currentBalance:500}]}
            />
        </section>
    )
}

export default Home
