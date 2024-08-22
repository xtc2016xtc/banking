import Link from "next/link"
import Image from "next/image"
import {linesIcon, PayIcon, RepayIcon} from "@/utils";
import {formatAmount} from "@/lib/utils";

// 定义一个 BankCard 组件，用于显示银行卡信息
const BankCard = ({ account, userName }:CreditCardProps)=> {
    return (
        <div className="flex flex-col">
            {/* 使用 Link 组件包裹银行卡信息，点击可以跳转到首页 */}
            <Link href="/" className="bank-card">
                <div className="bank-card_content">
                    <div>
                        {/* 显示账户名称或用户名 */}
                        <h1 className="text-16 font-semibold text-white">
                            {userName}
                        </h1>
                        {/* 显示当前余额 */}
                        <p className="font-ibm-plex-serif font-black text-white">
                            {formatAmount(account.currentBalance)}
                        </p>
                    </div>

                    <article className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            {/* 显示用户名 */}
                            <h1 className="text-12 font-semibold text-white">
                                {userName}
                            </h1>
                            {/* 显示卡片的有效期 */}
                            <h2 className="text-12 font-semibold text-white">
                                ●● / ●●
                            </h2>
                        </div>
                        {/* 显示卡号及余额 */}
                        <p className="text-14 font-semibold tracking-[1.1px] text-white">
                            ●●●● ●●●● ●●●● <span className="text-16">¥{1696}</span>
                        </p>
                    </article>
                </div>

                <div className="bank-card_icon">
                    {/* 显示支付图标 */}
                    <Image
                        src={PayIcon}
                        width={20}
                        height={24}
                        alt="pay"
                    />
                    {/* 显示银行卡图标 */}
                    <Image
                        src={RepayIcon}
                        width={45}
                        height={32}
                        alt="mastercard"
                        className="ml-5"
                    />
                </div>
                {/* 显示背景线条图标 */}
                <Image
                    src={linesIcon}
                    width={316}
                    height={190}
                    alt="lines"
                    className="absolute top-0 left-0"
                />
            </Link>
        </div>
    )
}

export default BankCard
