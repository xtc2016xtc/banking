import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {formatAmount, getTransactionStatus} from "@/lib/utils";

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
    console.log('Transactions:', transactions);
    if (!transactions || transactions.length === 0) {
        return <div>没有交易记录。</div>;
    }
    return (
        <Table>
            <TableHeader className="bg-[#f9fafb]">
                <TableRow>
                    <TableHead className="px-2">交易</TableHead>
                    <TableHead className="px-2">金额</TableHead>
                    <TableHead className="px-2">状态</TableHead>
                    <TableHead className="px-2">时间</TableHead>
                    <TableHead className="px-2 max-md:hidden">渠道</TableHead>
                    <TableHead className="px-2 max-md:hidden">类型</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((t: Transaction) => {
                    const status = getTransactionStatus(new Date(t.date));
                    const amount = formatAmount(t.amount);

                    return (
                        <TableRow key={t.id}>
                            <TableCell>{t.name}</TableCell>
                            <TableCell>{amount}</TableCell>
                            <TableCell>{status}</TableCell>
                            <TableCell>{new Date(t.date).toLocaleDateString()}</TableCell>
                            <TableCell className="max-md:hidden">{t.paymentChannel}</TableCell>
                            <TableCell className="max-md:hidden">{t.type}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default TransactionsTable;