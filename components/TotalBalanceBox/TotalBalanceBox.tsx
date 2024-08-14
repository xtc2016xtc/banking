
import AnimatedCounter from "@/components/CountUp/AnimatedCounter";
import DoughnutChart from "@/components/CountUp/DoughnutChart";
const TotalBalanceBox = ({ accounts = [], totalBanks, totalCurrentBalance}:TotalBalanceBoxProps) => {
    return (
        <section className="total-balance">
            <div className="total-balance-chart">
                {/*圆形图*/}
                <DoughnutChart accounts={accounts} />
            </div>

            <div className="flex flex-col gap-6">
                <h2 className="header-2">
                    {/*银行账户*/}
                    银行账户: {totalBanks}
                </h2>
                <div className="flex flex-col gap-2">
                    <p className="total-balance-label">
                        {/*流动资金*/}
                       流动资金
                    </p>

                    <div className="total-balance-amount flex-center gap-2">
                        <AnimatedCounter amount={totalCurrentBalance} />
                        {/*余额*/}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TotalBalanceBox