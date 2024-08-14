'use client';

import CountUp from 'react-countup';

const AnimatedCounter = ({ amount }: { amount: number }) => {
    return (
        <div className="w-full">
            <CountUp
                decimals={2}
                decimal=","
                prefix="¥"
                duration={3}
                end={amount}
            />
        </div>
    )
}

export default AnimatedCounter

/*
* decimals={2}[小数点前几位数]
  decimal=","[符号]
  prefix="¥"[钱币]
  duration={3}[持续时间]
  end={amount}[余额]
*
* */