import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  seller: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('catalog');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products: Product[] = [
    {
      id: 1,
      name: 'Стильное платье',
      price: 3999,
      oldPrice: 5999,
      image: 'https://cdn.poehali.dev/projects/c73eac32-0046-4d40-8358-5be15610a415/files/dafb85d7-6bc9-4816-89c2-c30af9570c2a.jpg',
      seller: 'Fashion Store',
      category: 'dresses'
    },
    {
      id: 2,
      name: 'Трендовая куртка',
      price: 7499,
      oldPrice: 9999,
      image: 'https://cdn.poehali.dev/projects/c73eac32-0046-4d40-8358-5be15610a415/files/a511ce86-4890-4927-ba11-cc640de0528f.jpg',
      seller: 'Urban Style',
      category: 'jackets'
    },
    {
      id: 3,
      name: 'Модные кроссовки',
      price: 5999,
      image: 'https://cdn.poehali.dev/projects/c73eac32-0046-4d40-8358-5be15610a415/files/094df3c9-9e22-4057-beb4-5cff0eec42de.jpg',
      seller: 'Sneaker Lab',
      category: 'shoes'
    },
    {
      id: 4,
      name: 'Летнее платье',
      price: 2999,
      image: 'https://cdn.poehali.dev/projects/c73eac32-0046-4d40-8358-5be15610a415/files/dafb85d7-6bc9-4816-89c2-c30af9570c2a.jpg',
      seller: 'Summer Vibes',
      category: 'dresses'
    },
    {
      id: 5,
      name: 'Зимняя куртка',
      price: 8999,
      oldPrice: 12999,
      image: 'https://cdn.poehali.dev/projects/c73eac32-0046-4d40-8358-5be15610a415/files/a511ce86-4890-4927-ba11-cc640de0528f.jpg',
      seller: 'Winter Wear',
      category: 'jackets'
    },
    {
      id: 6,
      name: 'Спортивные кеды',
      price: 4499,
      image: 'https://cdn.poehali.dev/projects/c73eac32-0046-4d40-8358-5be15610a415/files/094df3c9-9e22-4057-beb4-5cff0eec42de.jpg',
      seller: 'Sports Zone',
      category: 'shoes'
    }
  ];

  const categories = [
    { id: 'all', label: 'Все товары', icon: 'LayoutGrid' },
    { id: 'dresses', label: 'Платья', icon: 'Shirt' },
    { id: 'jackets', label: 'Куртки', icon: 'Wind' },
    { id: 'shoes', label: 'Обувь', icon: 'Footprints' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              FashionHub
            </h1>
            
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {cartCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-purple-600 to-pink-600">
                        {cartCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle className="text-2xl font-bold">Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                    ) : (
                      <>
                        {cart.map(item => (
                          <div key={item.id} className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                            <div className="flex-1">
                              <h4 className="font-semibold">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.seller}</p>
                              <p className="font-bold text-purple-600 mt-1">{item.price.toLocaleString()} ₽</p>
                            </div>
                            <div className="flex flex-col gap-2 items-center">
                              <div className="flex items-center gap-2">
                                <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, -1)}>
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, 1)}>
                                  <Icon name="Plus" size={14} />
                                </Button>
                              </div>
                              <Button size="sm" variant="ghost" onClick={() => removeFromCart(item.id)}>
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <div className="pt-4 border-t">
                          <div className="flex justify-between text-lg font-bold mb-4">
                            <span>Итого:</span>
                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              {cartTotal.toLocaleString()} ₽
                            </span>
                          </div>
                          <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b sticky top-[73px] z-40">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start border-b-0 bg-transparent h-14 gap-8">
              <TabsTrigger value="catalog" className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none">
                <Icon name="LayoutGrid" size={18} className="mr-2" />
                Каталог
              </TabsTrigger>
              <TabsTrigger value="profile" className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none">
                <Icon name="User" size={18} className="mr-2" />
                Профиль
              </TabsTrigger>
              <TabsTrigger value="contacts" className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none">
                <Icon name="Mail" size={18} className="mr-2" />
                Контакты
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'catalog' && (
          <div>
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                Коллекция
              </h2>
              <div className="flex gap-3 flex-wrap">
                {categories.map(cat => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={selectedCategory === cat.id ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
                  >
                    <Icon name={cat.icon as any} size={18} className="mr-2" />
                    {cat.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 animate-fade-in border-2 hover:border-purple-300">
                  <CardContent className="p-0 relative">
                    <div className="relative overflow-hidden aspect-square">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Icon 
                          name="Heart" 
                          size={20} 
                          className={favorites.includes(product.id) ? 'fill-pink-500 text-pink-500' : ''} 
                        />
                      </Button>
                      {product.oldPrice && (
                        <Badge className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-pink-500">
                          -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start gap-3 p-5">
                    <div className="w-full">
                      <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                        <Icon name="Store" size={14} />
                        {product.seller}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {product.price.toLocaleString()} ₽
                        </span>
                        {product.oldPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.oldPrice.toLocaleString()} ₽
                          </span>
                        )}
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      onClick={() => addToCart(product)}
                    >
                      <Icon name="ShoppingBag" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Мой профиль
            </h2>
            
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    <Icon name="User" size={40} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Анна Иванова</h3>
                    <p className="text-muted-foreground">anna.ivanova@example.com</p>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Имя</label>
                    <Input defaultValue="Анна Иванова" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Email</label>
                    <Input defaultValue="anna.ivanova@example.com" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Телефон</label>
                    <Input defaultValue="+7 (999) 123-45-67" />
                  </div>
                </div>
                
                <Button className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Сохранить изменения
                </Button>
              </CardContent>
            </Card>

            <h3 className="text-2xl font-bold mb-4">Избранное</h3>
            {favorites.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  <Icon name="Heart" size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Пока нет избранных товаров</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.filter(p => favorites.includes(p.id)).map(product => (
                  <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-shadow">
                    <CardContent className="p-0">
                      <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-3 p-5">
                      <h4 className="font-bold">{product.name}</h4>
                      <p className="text-xl font-bold text-purple-600">{product.price.toLocaleString()} ₽</p>
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                        onClick={() => addToCart(product)}
                      >
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Связаться с нами
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6">Напишите нам</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Имя</label>
                      <Input placeholder="Ваше имя" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Email</label>
                      <Input type="email" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Сообщение</label>
                      <Input placeholder="Ваше сообщение..." />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Отправить
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                        <Icon name="Mail" size={24} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Email</h4>
                        <p className="text-muted-foreground">support@fashionhub.ru</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                        <Icon name="Phone" size={24} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Телефон</h4>
                        <p className="text-muted-foreground">8 (800) 555-35-35</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                        <Icon name="MapPin" size={24} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Адрес</h4>
                        <p className="text-muted-foreground">г. Москва, ул. Модная, д. 1</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              FashionHub
            </h3>
            <p className="text-muted-foreground">Маркетплейс модной одежды</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
