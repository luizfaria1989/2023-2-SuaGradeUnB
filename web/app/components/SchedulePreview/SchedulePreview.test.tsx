import { render, act } from '@testing-library/react';
import SchedulePreview from './SchedulePreview';
import { downloadElementAsPNG } from './downloadUtils';

jest.mock('./downloadUtils', () => ({
  __esModule: true,
  downloadElementAsPNG: jest.fn(),
}));

const mockDownloadPNG = downloadElementAsPNG as jest.Mock;

const mockSetActiveModal = jest.fn();
const mockSetToDownload = jest.fn();
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initialState: any) => {
    if (initialState === false) {
      return [true, initialState === 'activeScheduleModal' ? mockSetActiveModal : mockSetToDownload];
    }
    return [initialState, jest.fn()];
  },
}));

jest.mock('@/app/hooks/useUser', () => ({
  __esModule: true,
  default: () => ({
    user: {
      is_anonymous: false,
      access: 'mock-token',
    },
  }),
}));

jest.mock('@/app/hooks/useSchedules', () => ({
  __esModule: true,
  default: () => ({
    localSchedules: [],
    setCloudSchedules: jest.fn(),
    setLocalSchedules: jest.fn(),
  }),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
}));

jest.mock('react-hot-toast', () => ({
  errorToast: jest.fn(),
  successToast: jest.fn(),
}));

jest.mock('@/app/utils/api/getSchedules', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({ data: [] })),
}));
jest.mock('@/app/utils/api/deleteSchedule', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({ status: 204 })),
}));
jest.mock('@/app/utils/api/saveSchedule', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({ status: 201 })),
}));

describe('SchedulePreview Component', () => {

  beforeEach(() => {
    mockDownloadPNG.mockClear(); 
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('deve chamar downloadElementAsPNG quando o estado de download for ativado', () => {
    render(<SchedulePreview index={0} isCloud={false} />);
    
    act(() => {
      jest.advanceTimersByTime(150); 
    });

    expect(mockDownloadPNG).toHaveBeenCalledWith('download-content', 'schedule-local-1.png');
  });
});