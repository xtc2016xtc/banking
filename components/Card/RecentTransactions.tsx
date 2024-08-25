import Link from 'next/link'
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs'
const RecentTransactions = ({ accounts,transactions=[],appwriteItemId,page=1}:RecentTransactionsProps) => {
    return (
        <section className="recent-transactions">
            <header className="flex items-center justify-between">
                <h2 className="recent-transactions-label">最近的交易</h2>
                <Link
                    href={`/transaction-history/?id=${appwriteItemId}`}
                    className="view-all-btn"
                >
                    更多
                </Link>
            </header>

            <Tabs defaultValue={appwriteItemId} className="w-full">
            <TabsList className="recent-transactions-tablist">
                {accounts.map((account:Account)=> (
                    <TabsTrigger key={account.id} value={account.appwriteItemId}>

                    </TabsTrigger>
                ))}
            </TabsList>
            </Tabs>
        </section>
    )
}

export default RecentTransactions