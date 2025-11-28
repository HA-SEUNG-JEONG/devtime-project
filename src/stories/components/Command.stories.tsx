import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';

const meta = {
  title: 'Components/Command',
  component: Command,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Command
export const Default: Story = {
  render: () => (
    <div className="w-full max-w-[400px]">
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="명령어를 검색하세요..." />
        <CommandList>
          <CommandEmpty>결과를 찾을 수 없습니다.</CommandEmpty>
          <CommandGroup heading="제안">
            <CommandItem>
              <span>프로필</span>
            </CommandItem>
            <CommandItem>
              <span>설정</span>
            </CommandItem>
            <CommandItem>
              <span>도움말</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="기타">
            <CommandItem>
              <span>로그아웃</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};

// 검색 가능한 Command
export const Searchable: Story = {
  render: () => {
    const SearchableComponent = () => {
      const [search, setSearch] = useState('');
      const items = [
        'Apple',
        'Banana',
        'Cherry',
        'Date',
        'Elderberry',
        'Fig',
        'Grape',
        'Honeydew',
      ];

      const filteredItems = items.filter(item =>
        item.toLowerCase().includes(search.toLowerCase())
      );

      return (
        <div className="w-full max-w-[400px]">
          <Command className="rounded-lg border shadow-md">
            <CommandInput
              placeholder="과일을 검색하세요..."
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty>결과를 찾을 수 없습니다.</CommandEmpty>
              <CommandGroup>
                {filteredItems.map(item => (
                  <CommandItem key={item} value={item}>
                    <span>{item}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      );
    };
    return <SearchableComponent />;
  },
};

// 단축키가 있는 Command
export const WithShortcuts: Story = {
  render: () => (
    <div className="w-full max-w-[400px]">
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="명령어를 검색하세요..." />
        <CommandList>
          <CommandEmpty>결과를 찾을 수 없습니다.</CommandEmpty>
          <CommandGroup heading="파일">
            <CommandItem>
              <span>새 파일</span>
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>열기</span>
              <CommandShortcut>⌘O</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>저장</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="편집">
            <CommandItem>
              <span>복사</span>
              <CommandShortcut>⌘C</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>붙여넣기</span>
              <CommandShortcut>⌘V</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};

// Command Dialog
export const Dialog: Story = {
  render: () => {
    const DialogComponent = () => {
      const [open, setOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setOpen(true)}>명령 팔레트 열기</Button>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="명령어를 검색하세요..." />
            <CommandList>
              <CommandEmpty>결과를 찾을 수 없습니다.</CommandEmpty>
              <CommandGroup heading="제안">
                <CommandItem
                  onSelect={() => {
                    console.log('프로필 선택');
                    setOpen(false);
                  }}
                >
                  <span>프로필</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    console.log('설정 선택');
                    setOpen(false);
                  }}
                >
                  <span>설정</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    console.log('도움말 선택');
                    setOpen(false);
                  }}
                >
                  <span>도움말</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </>
      );
    };
    return <DialogComponent />;
  },
};

// 다중 그룹
export const MultipleGroups: Story = {
  render: () => (
    <div className="w-full max-w-[400px]">
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="검색하세요..." />
        <CommandList>
          <CommandEmpty>결과를 찾을 수 없습니다.</CommandEmpty>
          <CommandGroup heading="프로젝트">
            <CommandItem>프로젝트 1</CommandItem>
            <CommandItem>프로젝트 2</CommandItem>
            <CommandItem>프로젝트 3</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="팀">
            <CommandItem>팀 A</CommandItem>
            <CommandItem>팀 B</CommandItem>
            <CommandItem>팀 C</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="개인">
            <CommandItem>내 작업</CommandItem>
            <CommandItem>즐겨찾기</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};
