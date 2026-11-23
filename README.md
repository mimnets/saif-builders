# সাইফ বিল্ডার্স ওয়েবসাইট

স্ট্যাটিক ওয়েবসাইট (HTML + Tailwind CSS + JavaScript)। কোনো সার্ভার বা ডাটাবেস লাগে না, তাই GitHub Pages-এ বিনামূল্যে হোস্ট করা যায়।

## ফাইলগুলো কোথায় কী

| ফাইল | কাজ |
|---|---|
| `index.html` | হোম/ল্যান্ডিং পেজ |
| `projects.html` | সব প্রজেক্টের তালিকা (ফিল্টারসহ) |
| `project.html?id=tvs` | প্রজেক্টের বিস্তারিত পেজ (৩ডি ভিউ, ফ্লোর প্ল্যান, পেমেন্ট প্ল্যান) |
| `assets/js/data.js` | **ফোন নম্বর, ঠিকানা, প্রজেক্ট, অফার সব এখানে।** কিছু বদলাতে শুধু এই ফাইলটা এডিট করুন |
| `assets/img/projects/<id>/` | প্রতিটি প্রজেক্টের `view-1..4.svg` (৩ডি ভিউ) আর `plan-1000/1250/1500.svg` (ফ্লোর প্ল্যান) |
| `assets/img/logo.svg`, `favicon.svg` | লোগো ও ফেভিকন |
| `assets/css/style.css` | বিল্ড করা Tailwind CSS |

প্রজেক্ট id: `tvs`, `khalek-1`, `khalek-2`, `malek`, `niribili`

### আসল ছবি বসাতে চাইলে
একই নামে ছবি রাখলেই হবে, যেমন `assets/img/projects/tvs/view-1.jpg`। তারপর `assets/js/project.js` এবং `main.js`-এ `.svg` লেখা জায়গায় `.jpg` করে দিন।

---

## GitHub Pages-এ হোস্ট করার নিয়ম (ব্রাউজার থেকে, কোনো সফটওয়্যার ছাড়া)

1. https://github.com এ লগইন করুন। ডান কোণে **+** থেকে **New repository**।
2. নাম দিন, যেমন `saif-builders`। **Public** রাখুন। **Create repository** চাপুন।
3. নতুন রিপোতে **uploading an existing file** লিংকে ক্লিক করুন।
4. ZIP ফাইলটা আনজিপ করে ভেতরের **সব ফাইল ও ফোল্ডার** (index.html যেখানে আছে সেখানকার সবকিছু) টেনে এনে ছেড়ে দিন। নিচে **Commit changes** চাপুন।
5. রিপোর **Settings → Pages** এ যান। **Source: Deploy from a branch**, Branch: **main**, ফোল্ডার: **/ (root)**। **Save**।
6. ১-২ মিনিট পর সাইট চালু হবে: `https://<আপনার-ইউজারনেম>.github.io/saif-builders/`

### কমান্ড লাইন দিয়ে (git জানা থাকলে)
```bash
cd saif-builders-website
git init && git add . && git commit -m "Saif Builders website"
git branch -M main
git remote add origin https://github.com/<ইউজারনেম>/saif-builders.git
git push -u origin main
```
তারপর উপরের ৫ নম্বর ধাপ।

### নিজের ডোমেইন (যেমন saifbuilders.com)
Settings → Pages → **Custom domain** এ ডোমেইন লিখুন। ডোমেইন প্রোভাইডারে একটা `CNAME` রেকর্ড দিন `<ইউজারনেম>.github.io` এর দিকে।

---

## ডিজাইন বদলাতে (ডেভেলপারদের জন্য)
CSS আবার বিল্ড করতে `source` ফোল্ডারে:
```bash
npm install
npx @tailwindcss/cli -i src/input.css -o public/assets/css/style.css --minify
python3 tools/gen_images.py   # ৩ডি ভিউ, ফ্লোর প্ল্যান, লোগো নতুন করে তৈরি
```
