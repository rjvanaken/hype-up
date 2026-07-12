import { Link, useNavigate } from 'react-router-dom'
import { Bell, ChevronDown } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

function Nav() {
  const navigate = useNavigate()
  const unreadCount = 3 // wire this to real notification state later

  const handleLogout = () => {
    // TODO: wire to supabase.auth.signOut(), then navigate('/login')
  }

  return (
    <nav className="flex items-center justify-between border-b bg-background px-6 py-3">
      {/* Left: logo/icon */}
      <Link to="/" className="text-xl font-heading font-semibold text-primary">
        HypeUp
      </Link>

      {/* Center: 4 nav buttons */}
      <div className="flex items-center gap-6">
        <Link to="/" className="text-sm font-medium hover:text-primary">
          Feed
        </Link>
        <Link to="/discover" className="text-sm font-medium hover:text-primary">
          Discover
        </Link>
        <Link to="/profile" className="text-sm font-medium hover:text-primary">
          Profile
        </Link>
        <Link to="/create" className="text-sm font-medium hover:text-primary">
          Post
        </Link>
      </div>

      {/* Right: bell, avatar, dropdown */}
      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-4 w-4 justify-center p-0 text-[10px]">
              {unreadCount}
            </Badge>
          )}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 outline-none">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default Nav