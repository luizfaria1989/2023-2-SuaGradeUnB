import html2canvas from 'html2canvas';

export const downloadElementAsPNG = async (elementId: string, fileName: string) => {
  const input = document.getElementById(elementId);
  
  if (!input) {
    console.error("Elemento da grade não encontrado para download.");
    return;
  }

  try {
    const canvas = await html2canvas(input, { scale: 2 });
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = fileName;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Erro ao gerar PNG:", error);
  }
};
