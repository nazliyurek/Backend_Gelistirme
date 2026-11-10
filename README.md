# Taskflow Backend API

Node.js ve Express kullanılarak geliştirilmiş, RESTful mimariye sahip örnek bir Görev Yönetimi (Task Management) API projesidir.

## Özellikler
* **CRUD Operasyonları:** Görev oluşturma, listeleme, tekil görüntüleme, güncelleme ve silme.
* **Kısmi Güncelleme:** `PUT` ve `PATCH` desteği.
* **Hata Yönetimi:** Bulunamayan ID'ler için `404 Not Found` desteği.

## Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için şu adımları izleyin:

1. Depoyu klonlayın veya indirin.
2. Proje klasörüne gidin ve bağımlılıkları yükleyin:
   ```bash
   npm install
3. Sunucunun ana giriş dosyasını çalıştırın:
   ```bash
   node server.js
4. Sunucu http://localhost:3000 adresinde çalışmaya başlayacaktır. Postman veya benzeri bir araç ile test edebilirsiniz.

## API Endpoint'leri
* `GET /tasks` - Tüm görevleri listeler
* `GET /tasks/:id` - Belirli bir görevin detayını getirir
* `POST /tasks` - Yeni görev oluşturur
* `PUT /tasks/:id` - Görevi günceller
* `PATCH /tasks/:id` - Görevi kısmen günceller
* `DELETE /tasks/:id` - Görevi siler