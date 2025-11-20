
# Game Asset Dashboard

A Next.js application for browsing and filtering game assets with wallet-based ownership filtering.

## Features

- 🎮 Browse all game assets from the backend API
- 🔍 Filter assets by owner address (wallet-based)
- ⚡ Real-time filtering with React Query
- 🎨 Modern, responsive UI
- 🔒 Type-safe implementation with TypeScript
- 📱 Mobile-friendly design

## Quick Start

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ni2faa/Game_Platform.git
   cd game-asset-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   
   Ensure your `.env` file is configured with:
   ```
   NEXT_PUBLIC_NEST_API_PREFIX=http://localhost:3099
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```

   This starts:
   - Backend server on port **3099**
   - Frontend (Next.js) on port **3000**

5. **Access the application**
   - Main app: http://localhost:3000
   - Assets page: http://localhost:3000/assets

## Game Asset Filter Page

### Overview

The Game Asset Filter Page (`/assets`) allows users to:
- View all available game assets
- Connect a wallet (currently using mock address)
- Filter assets to show only those owned by the connected wallet

### How It Works

1. **Initial Load**: Displays all assets from the backend API
2. **Wallet Connection**: Click "Connect Wallet" to enable filtering
3. **Filter Toggle**: When wallet is connected, toggle "Show Owned Only" to filter assets
4. **Dynamic Filtering**: Backend filters assets by owner address in real-time

### API Endpoint

```
GET /api/v1/assets?owner={address}
```

**Request:**
- `owner` (optional): Ethereum wallet address to filter by (case-insensitive)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Obsidian Blade",
      "image": "https://placehold.co/400?text=Obsidian+Blade",
      "owner": "0x1234567890abcdef1234567890abcdef12345678"
    }
  ]
}
```

**Examples:**
```bash
# Get all assets
curl http://localhost:3099/api/v1/assets

# Get assets for specific owner
curl "http://localhost:3099/api/v1/assets?owner=0x1234567890abcdef1234567890abcdef12345678"
```

## Testing

### Manual Testing Steps

1. **Access the Assets Page**
   - Navigate to http://localhost:3000/assets
   - Verify assets are displayed

2. **Test Asset Loading**
   - Check browser Network tab
   - Verify API call: `GET /api/v1/assets`
   - Confirm assets render correctly

3. **Test Wallet Connection**
   - Click "Connect Wallet" button
   - Verify button changes to "Wallet Connected" (disabled)
   - Confirm filter toggle appears

4. **Test Owner Filtering**
   - Toggle "Show Owned Only" filter
   - Check Network tab for filtered request
   - Verify only matching assets are displayed

5. **Test Error Handling**
   - Stop backend server
   - Refresh page
   - Verify error message appears

### API Testing

Test the API endpoint directly:

```bash
# Get all assets
curl http://localhost:3099/api/v1/assets

# Filter by owner (case-insensitive)
curl "http://localhost:3099/api/v1/assets?owner=0x1234567890abcdef1234567890abcdef12345678"
curl "http://localhost:3099/api/v1/assets?owner=0X1234567890ABCDEF1234567890ABCDEF12345678"
```

## Project Structure

### Backend

- `backend/controllers/assetController.js` - Asset controller with filtering logic
- `backend/routes/assetRoute.js` - Asset API routes
- `public/mock-assets.json` - Mock asset data

### Frontend

- `pages/assets/index.tsx` - Assets dashboard page
- `lib/api-nest.ts` - API client functions
- `lib/types.ts` - TypeScript type definitions
- `components/assets/` - Asset-related components

## Mock Data

Assets are loaded from `public/mock-assets.json`. The current implementation uses a mock wallet address:

```
0x1234567890abcdef1234567890abcdef12345678
```

To test filtering, ensure some assets in `mock-assets.json` have this owner address.

## Troubleshooting

### Assets Not Loading
- ✅ Verify backend server is running on port 3099
- ✅ Check `public/mock-assets.json` exists and has valid JSON
- ✅ Check browser console for errors
- ✅ Verify API endpoint is accessible: http://localhost:3099/api/v1/assets

### Filter Not Working
- ✅ Ensure wallet is "connected" (mock address is set)
- ✅ Check Network tab to see if `owner` parameter is being sent
- ✅ Verify owner addresses in `mock-assets.json` match the mock wallet address

### CORS Errors
- ✅ Ensure backend CORS is configured to allow `http://localhost:3000`
- ✅ Check `backend/app.js` CORS settings

### Port Conflicts
- ✅ If port 3099 is in use, set `PORT` environment variable
- ✅ If port 3000 is in use, Next.js will automatically use the next available port

## Technology Stack

- **Frontend**: Next.js 13, React 18, TypeScript
- **State Management**: React Query, Recoil
- **Styling**: Tailwind CSS
- **Backend**: Express.js, Node.js
- **API Client**: Axios

## Development

### Available Scripts

- `npm run dev` - Start development server (backend + frontend)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## License

AGPL-3.0
