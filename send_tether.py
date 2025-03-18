from tronpy import Tron
from tronpy.keys import PrivateKey

# آدرس دریافت کننده
receiver_address = "TB22QfzxJRm8NPQLmw4BovGF4BEfUNXuHc"

# کلید خصوصی (لطفاً اطمینان حاصل کنید که این کلید خصوصی واقعی نیست)
private_key = "90de8d4365da8420391c573dc32909cf17f3dd53ec581251ea13473efa213cf7"

# مقدار تتر برای ارسال (به واحد smallest، 1 USDT = 1,000,000)
amount = 30000000  # 30 میلیون تتر

# ایجاد یک نمونه از شبکه ترون
client = Tron()

# ایجاد کلید خصوصی
key = PrivateKey(bytes.fromhex(private_key))

# محاسبه ارزش تتر به دلار (با فرض اینکه هر USDT برابر با 1 دلار است)
total_value_usd = amount  # چون هر USDT برابر با 1 دلار است

# نمایش اطلاعات
print(f"مقدار تتر: {amount} USDT")
print(f"ارزش کل به دلار: ${total_value_usd:.2f}")

# ساخت تراکنش
txn = (
    client.trx.transfer(key.public_key.to_base58check_address(), receiver_address, amount)
    .build()
    .sign(key)
)

# ارسال تراکنش
result = txn.broadcast()

# نمایش نتیجه
if result['result']:
    print(f"تراکنش با موفقیت انجام شد. Transaction ID: {result['txid']}")
else:
    print("خطا در ارسال تراکنش.")
