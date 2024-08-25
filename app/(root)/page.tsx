
import HeaderBox from "@/components/Header/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox/TotalBalanceBox";
import RightSidebar from "@/components/right/RightSidebar";
import {getLoggedInUser} from "@/lib/actions/user.actions";
import {getAccount, getAccounts} from "@/lib/actions/bank.actions";
import RecentTransactions from "@/components/Card/RecentTransactions";
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

const Home = async ({searchParams: { id, page }}:SearchParamProps) => {
    const currentPage = Number(page as string) || 1;
    const loggedIn = await getLoggedInUser();
    const title = getGreetingBasedOnTime();
    const accounts = await getAccounts({
        userId: loggedIn.$id
    })

    if(!accounts) return;

    const accountsData = accounts?.data;
    const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

    const account = await getAccount({ appwriteItemId })


    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title={title}
                        user={loggedIn?.firstName || '名字获取错误'}
                        subtext="银行交易平台"
                    />

                    <TotalBalanceBox
                        accounts={accountsData}
                        totalBanks={accounts?.totalBanks}
                        totalCurrentBalance={accounts?.totalCurrentBalance}
                    />
                </header>

                <RecentTransactions

                />
            </div>

            <RightSidebar
                user={loggedIn}
                transactions={accounts?.transactions}
                banks={accountsData?.slice(0,2)}
            />
        </section>
    )
}

export default Home
