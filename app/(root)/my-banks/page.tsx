import HeaderBox from "@/components/Header/HeaderBox";
import {getLoggedInUser} from "@/lib/actions/user.actions";
import {getAccounts} from "@/lib/actions/bank.actions";
import BankCard from "@/components/Card/BankCard";

const MyBanks = async () => {
    const loggedIn = await getLoggedInUser();
    const accounts = await getAccounts({
        userId: loggedIn.$id
    })
    return (
        <section className="flex">
            <div className="my-banks">
                <HeaderBox
                    title="我的银行"
                    subtext="管理银行业务"
                />

                <div className="space-y-4">
                    <h2 className="header-2">
                        你的银行卡
                    </h2>
                    <div className="flex flex-wrap gap-6">
                        {accounts && accounts.data.map((a: Account) => (
                            <BankCard
                                key={accounts.id}
                                account={a}
                                userName={loggedIn?.firstName}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MyBanks