import { downloadElementAsPNG } from './downloadUtils';
import html2canvas from 'html2canvas';

jest.mock('html2canvas', () => jest.fn());

const mockLink = {
  href: '',
  download: '',
  click: jest.fn(),
  appendChild: jest.fn(),
  removeChild: jest.fn(),
};

jest.spyOn(console, 'error').mockImplementation(() => {});

describe('downloadElementAsPNG', () => {

  beforeEach(() => {
    (html2canvas as jest.Mock).mockClear();
    (console.error as jest.Mock).mockClear();
    mockLink.click.mockClear();
    
    document.createElement = jest.fn(() => mockLink as any);
    document.body.appendChild = jest.fn();
    document.body.removeChild = jest.fn();
    document.body.innerHTML = '<div id="test-element"></div>';
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it('deve chamar html2canvas, criar um link e acionar o download', async () => {
    const mockCanvas = document.createElement('canvas'); 
    const mockDataURL = 'data:image/png;base64,mockedimagedata...';
    mockCanvas.toDataURL = () => mockDataURL;
    (html2canvas as jest.Mock).mockResolvedValue(mockCanvas);

    const element = document.getElementById('test-element');
    const fileName = 'minha-grade.png';

    await downloadElementAsPNG('test-element', fileName);
    
    expect(html2canvas).toHaveBeenCalledWith(element, { scale: 2 });
    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(mockLink.href).toBe(mockDataURL);
    expect(mockLink.download).toBe(fileName);
    expect(document.body.appendChild).toHaveBeenCalledWith(mockLink);
    expect(mockLink.click).toHaveBeenCalledTimes(1);
    expect(document.body.removeChild).toHaveBeenCalledWith(mockLink);
  });

  it('deve logar um erro se o elemento não for encontrado', async () => {
    document.body.innerHTML = '';
    
    await downloadElementAsPNG('elemento-inexistente', 'test.png');
    expect(html2canvas).not.toHaveBeenCalled();
    expect(document.createElement).not.toHaveBeenCalled(); 
    
    expect(console.error).toHaveBeenCalledWith(
      "Elemento da grade não encontrado para download."
    );
  });
});