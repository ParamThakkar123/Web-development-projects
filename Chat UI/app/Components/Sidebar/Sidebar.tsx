import React from 'react'
import { Button } from '@/components/ui/button'
import { SquarePen } from "lucide-react";

const Sidebar = () => {
  return (
    <div className='p-6'>
      <div>
        <Button variant="outline" className='rounded gap-5'>
            New Chat
            <SquarePen size={15}/>
        </Button>
        <div>
            {/*Space for old chats*/}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
