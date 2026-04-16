import { motion } from "motion/react";
import { Coffee, Mail, CheckCircle2, Menu, X, Loader2 } from "lucide-react";
import { useState, FormEvent } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const navLinks = [
    { name: "Profile", href: "#profile" },
    { name: "Story", href: "#story" },
    { name: "Service", href: "#service" },
    { name: "Contact", href: "#contact" },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      // FormSubmit.co AJAX endpoint - No setup required, just works with your email.
      const response = await fetch("https://formsubmit.co/ajax/brandweb.designjp@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setFormStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen selection:bg-cafe-tan selection:text-cafe-brown">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-cafe-cream/80 backdrop-blur-md border-b border-cafe-brown/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-0">
              <img 
                src="./logo.png" 
                alt="Logo" 
                className="w-30 h-30 object-contain" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="font-serif text-xl font-bold tracking-tight">BrandWeb.Design</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium hover:text-cafe-olive transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Nav Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-cafe-cream border-b border-cafe-brown/10 px-4 pt-2 pb-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium py-2 border-b border-cafe-brown/5"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000"
              alt="Cafe background"
              className="w-full h-full object-cover opacity-20"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-cafe-cream/0 via-cafe-cream/50 to-cafe-cream" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 bg-cafe-tan/20 text-cafe-brown border-cafe-tan/30 px-4 py-1 text-sm rounded-full">
                Cafe & Coffee Specialist Engineer
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                カフェの魅力を<span className="text-cafe-olive italic">デジタルの世界</span>で形にする。
              </h1>
              <p className="text-lg md:text-xl text-cafe-brown/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                コーヒーの香りが漂うような、温かみのあるウェブサイトを。
                個人だからこそできる、寄り添ったサポートを提供します。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#service" 
                  className={cn(
                    buttonVariants({ size: "lg" }), 
                    "bg-cafe-brown hover:bg-cafe-brown/90 text-white rounded-full px-8 h-12 text-lg flex items-center justify-center"
                  )}
                >
                  サービスを見る
                </a>
                <a 
                  href="#profile" 
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }), 
                    "border-cafe-brown text-cafe-brown hover:bg-cafe-brown/5 rounded-full px-8 h-12 text-lg flex items-center justify-center"
                  )}
                >
                  プロフィール
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Profile Section */}
        <section id="profile" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-cafe-tan/10 flex items-center justify-center">
                  <img
                    src="./profile.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // 画像がない場合のフォールバック
                      e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-cafe-tan p-8 rounded-2xl shadow-xl hidden lg:block">
                  <p className="font-serif text-2xl italic">"Coffee & Code"</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-8">自己紹介</h2>
                <div className="space-y-6 text-lg text-cafe-brown/80 leading-relaxed">
                  <p>
                    <span className="font-bold text-cafe-brown text-2xl block mb-2">名前：森年スティーブン航太郎</span>
                    エンジニアとしてのキャリアを歩みながら、休日は必ずお気に入りの喫茶店で過ごすほどのコーヒー好きです。
                  </p>
                  <p>
                    「カフェ・喫茶店・コーヒー大好き」という気持ちは誰にも負けません。
                    豆の産地から淹れ方まで、コーヒーが持つ奥深いストーリーに魅了されています。
                  </p>
                  <p>
                    エンジニアとしては、モダンな技術を用いた高速で使いやすいウェブサイト制作を得意としています。
                    技術の力を使って、大好きなカフェ業界に貢献したいという想いでこの活動を始めました。
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section id="story" className="py-24 bg-cafe-cream">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-12">活動の経緯と想い</h2>
              <div className="space-y-8 text-left bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-cafe-brown/5">
                <div>
                  <h3 className="text-2xl font-serif font-bold mb-4 text-cafe-olive">なぜこのサービスを始めたか</h3>
                  <p className="text-lg text-cafe-brown/80 leading-relaxed">
                    多くの素晴らしいカフェが、ウェブサイトを持っていない、あるいは古い情報のまま放置されている現状を目の当たりにしました。
                    「もっと多くの人にこのお店を知ってほしい」という純粋な想いと、
                    大手制作会社では高額になりがちな制作費がハードルになっているという課題を解決したいと考えたのがキッカケです。
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold mb-4 text-cafe-olive">活動内容</h3>
                  <p className="text-lg text-cafe-brown/80 leading-relaxed">
                    単にサイトを作るだけでなく、そのお店の「空気感」や「こだわり」を丁寧にヒアリングし、
                    訪れる前からお店のファンになってもらえるようなデザインを提案しています。
                    現在は、地域に根ざした個人経営のカフェを中心に、デジタル化のサポートを行っています。
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Service Section */}
        <section id="service" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">サービス情報</h2>
              <p className="text-lg text-cafe-brown/60">カフェオーナー様に寄り添った、持続可能なプランをご提案します。</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <Card className="border-none shadow-lg bg-cafe-cream/50 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-cafe-olive/10 rounded-xl flex items-center justify-center mb-4">
                    <CheckCircle2 className="text-cafe-olive" />
                  </div>
                  <CardTitle className="text-2xl">圧倒的なコストパフォーマンス</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-cafe-brown/70 leading-relaxed">
                    大手企業や制作サービスを利用するよりも、個人だからこそできる柔軟な価格設定。
                    広告費や固定費を削り、その分を品質とサポートに還元しています。
                  </p>
                </CardContent>
              </Card>

              {/* Benefit 2 */}
              <Card className="border-2 border-cafe-olive shadow-xl scale-105 z-10 bg-white">
                <CardHeader>
                  <div className="w-12 h-12 bg-cafe-olive rounded-xl flex items-center justify-center mb-4">
                    <CheckCircle2 className="text-white" />
                  </div>
                  <CardTitle className="text-2xl">初期費用0円・月額1,500円〜</CardTitle>
                  <CardDescription className="text-cafe-olive font-bold">導入から運用まで安心の定額制</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-cafe-brown/70 leading-relaxed mb-6">
                    初期導入費は無料。毎月1,500円からという、コーヒー数杯分の価格でプロ仕様のサイトを維持できます。
                    サーバー代やドメイン管理もすべてお任せください。
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-cafe-olive" />
                      メニュー更新・写真差し替え無料
                    </li>
                    <li className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-cafe-olive" />
                      スマートフォン完全対応
                    </li>
                    <li className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-cafe-olive" />
                      Googleマップ・SNS連携
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Benefit 3 */}
              <Card className="border-none shadow-lg bg-cafe-cream/50 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-cafe-olive/10 rounded-xl flex items-center justify-center mb-4">
                    <CheckCircle2 className="text-cafe-olive" />
                  </div>
                  <CardTitle className="text-2xl">柔軟な更新・サポート</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-cafe-brown/70 leading-relaxed">
                    季節限定メニューの追加や、営業時間の変更など、カフェならではの頻繁な更新にも柔軟に対応します。
                    LINEやメールで気軽にご依頼いただける体制を整えています。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-cafe-brown text-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-4xl font-bold mb-8">お問い合わせ</h2>
                <p className="text-cafe-cream/70 text-lg mb-8">
                  ウェブサイト制作の相談、お見積もり、または「まずは話を聞いてみたい」という方も、お気軽にご連絡ください。
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span>brandweb.designjp@gmail.com</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl text-cafe-brown">
                {formStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-20 h-20 bg-cafe-olive/10 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-cafe-olive" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">送信完了</h3>
                    <p className="text-cafe-brown/70 mb-8">
                      お問い合わせありがとうございます。<br />
                      内容を確認次第、折り返しご連絡させていただきます。
                    </p>
                    <Button
                      onClick={() => setFormStatus('idle')}
                      variant="outline"
                      className="border-cafe-olive text-cafe-olive hover:bg-cafe-olive/5"
                    >
                      フォームに戻る
                    </Button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="text-sm font-bold mb-1 block">お名前</label>
                      <Input
                        name="name"
                        required
                        disabled={formStatus === 'sending'}
                        placeholder="山田 太郎"
                        className="bg-cafe-cream/50 border-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold mb-1 block">メールアドレス</label>
                      <Input
                        name="email"
                        type="email"
                        required
                        disabled={formStatus === 'sending'}
                        placeholder="example@mail.com"
                        className="bg-cafe-cream/50 border-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold mb-1 block">メッセージ</label>
                      <Textarea
                        name="message"
                        required
                        disabled={formStatus === 'sending'}
                        placeholder="ご相談内容をご記入ください"
                        className="bg-cafe-cream/50 border-none min-h-[120px]"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="w-full bg-cafe-olive hover:bg-cafe-olive/90 text-white py-6 text-lg font-bold rounded-xl flex items-center justify-center gap-2"
                    >
                      {formStatus === 'sending' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          送信中...
                        </>
                      ) : (
                        "送信する"
                      )}
                    </Button>
                    {formStatus === 'error' && (
                      <p className="text-destructive text-sm text-center mt-2">
                        送信に失敗しました。時間をおいて再度お試しください。
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-cafe-cream border-t border-cafe-brown/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-0 mb-4">
            <img 
              src="./logo.png" 
              alt="Logo" 
              className="w-30 h-30 object-contain" 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="font-serif text-lg font-bold">BrandWeb.Design</span>
          </div>
          <p className="text-sm text-cafe-brown/50">
            © 2026 BrandWeb.Design. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
