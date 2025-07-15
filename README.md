# Supabase Next.js Admin Dashboard

Web application admin dashboard sử dụng Next.js, Prisma, và Supabase PostgreSQL để quản lý users, licenses, và audit logs.

<!-- Updated: Added environment variable support -->

## ✨ Tính năng

- 📊 **Dashboard** - Thống kê tổng quan users, licenses, admins
- 👥 **User Management** - Quản lý users và roles
- 🔑 **License Management** - Quản lý license keys và trạng thái
- ⚙️ **Admin Management** - Quản lý admin accounts
- 📋 **Audit Logs** - Theo dõi các hành động trong hệ thống
- 🎨 **Modern UI** - Responsive design với Tailwind CSS

## 🚀 Cài đặt

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Tạo file .env

```bash
DATABASE_URL="postgresql://postgres:6KWt1a7lVl2I21wD@db.eaalfzwrrphsdhdrdgjl.supabase.co:5432/postgres"
```

### 3. Setup database

```bash
# Tạo migration
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# Thêm dữ liệu mẫu
npm run seed
```

### 4. Chạy development server

```bash
npm run dev
```

App sẽ chạy tại `http://localhost:3000`

## 📁 Cấu trúc project

```
├── app/
│   ├── page.tsx          # Dashboard chính
│   ├── users/page.tsx    # Quản lý users
│   ├── licenses/page.tsx # Quản lý licenses
│   ├── admins/page.tsx   # Quản lý admins
│   ├── audit/page.tsx    # Audit logs
│   └── globals.css       # Styles
├── prisma/
│   ├── schema.prisma     # Database schema
│   ├── seed.js           # Dữ liệu mẫu
│   └── migrations/       # Migration files
├── lib/
│   └── prisma.ts         # Prisma client
└── vercel.json           # Vercel config
```

## 🌐 Deploy lên Vercel

### 1. Push code lên GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy trên Vercel

1. Vào [vercel.com](https://vercel.com) và đăng nhập
2. Click "New Project"
3. Import GitHub repository
4. Thêm environment variable:
   - `DATABASE_URL`: Connection string Supabase

### 3. Chạy migration trên production

```bash
npx prisma migrate deploy
```

## 📊 Database Schema

Schema bao gồm:

- **User Management**: User, Account, Session, VerificationToken
- **License System**: License với các trạng thái (ACTIVE, PENDING, EXPIRED, REVOKED)
- **Admin System**: Admin với phân quyền (Admin, Super Admin)
- **Audit Trail**: AuditLog để theo dõi các thay đổi
- **Usage Analytics**: Usage để phân tích sử dụng

## 🛠️ Scripts

```bash
npm run dev          # Development server
npm run build        # Build for production
npm run start        # Start production server
npm run generate     # Generate Prisma Client
npm run migrate      # Run migrations
npm run seed         # Seed database
npm run studio       # Open Prisma Studio
```

## 📱 Screenshots

- Dashboard với thống kê tổng quan
- Bảng users với thông tin chi tiết
- Quản lý licenses và trạng thái
- Audit logs với lịch sử hoạt động

## 🔧 Customization

- Themes: Customize colors trong `tailwind.config.js`
- Components: Tạo thêm components trong `components/`
- API Routes: Thêm API routes trong `app/api/`
- Authentication: Tích hợp NextAuth.js nếu cần 