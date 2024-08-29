
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'
import HeaderBox from "@/components/Header/HeaderBox";
import PaymentTransferForm from "@/components/Form/PaymentTransferForm";

const Transfer = async () => {
    const loggedIn = await getLoggedInUser();
    const accounts = await getAccounts({
        userId: loggedIn.$id
    })

    if(!accounts) return;

    const accountsData = accounts?.data;

    return (
        <section className="payment-transfer">
            <HeaderBox
                title="转账"
                subtext="转账细节跟说明"
            />

            <section className="size-full pt-5">
                <PaymentTransferForm accounts={accountsData} />
            </section>
        </section>
    )
}

export default Transfer