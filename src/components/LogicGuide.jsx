import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const GUIDE_PAGES = [
  {
    id: 'introducao',
    title: 'Introdução às Portas Lógicas',
    file: 'introducao.md',
  },
  {
    id: 'leis-de-morgan',
    title: 'Leis de De Morgan',
    file: 'leis-de-morgan.md',
  },
  {
    id: 'portas-derivadas',
    title: 'Portas Derivadas',
    file: 'portas-derivadas.md',
  },
  {
    id: 'exercicios-praticos',
    title: 'Exercícios Práticos',
    file: 'exercicios-praticos.md',
  },
  {
    id: 'aplicacoes-avancadas',
    title: 'Aplicações Avançadas',
    file: 'aplicacoes-avancadas.md',
  },
  {
    id: 'dicas-chipbuilder',
    title: 'Dicas para ChipBuilder',
    file: 'dicas-chipbuilder.md',
  }
];

export default function LogicGuide({ isOpen, onClose }) {
  const [currentPage, setCurrentPage] = useState('introducao');
  const [allGuidesContent, setAllGuidesContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const contentRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchContent = async () => {
      setLoading(true);
      try {
        const page = GUIDE_PAGES.find(p => p.id === currentPage);
        const response = await fetch(`${process.env.PUBLIC_URL}/guides/${page.file}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        setAllGuidesContent(prevContent => ({
          ...prevContent,
          [page.id]: text,
        }));
      } catch (error) {
        console.error("Failed to fetch guide:", error);
        setAllGuidesContent(prevContent => ({
          ...prevContent,
          [currentPage]: `Erro ao carregar o guia. Por favor, tente novamente.`,
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [currentPage, isOpen]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  const currentPageData = GUIDE_PAGES.find(p => p.id === currentPage);

  const filteredPages = GUIDE_PAGES.filter(page => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    if (!lowerCaseSearchTerm) return true;

    const titleMatch = page.title.toLowerCase().includes(lowerCaseSearchTerm);
    const contentMatch = (allGuidesContent[page.id] || '').toLowerCase().includes(lowerCaseSearchTerm);
    
    return titleMatch || contentMatch;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-[95vw] h-[95vh] max-w-6xl flex">
        
        {/* Sidebar de Navegação */}
        <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
          {/* Header do Sidebar */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              <h2 className="text-lg font-bold text-gray-800">Guia de Lógica Digital</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">Navegue pelos tópicos para aprender sobre lógica digital e as Leis de De Morgan</p>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar capítulo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>

          {/* Lista de Páginas */}
          <div className="flex-1 overflow-y-auto p-2">
            {filteredPages.map((page, index) => (
              <button
                key={page.id}
                onClick={() => setCurrentPage(page.id)}
                className={`w-full text-left p-3 rounded-lg mb-2 transition-all group ${
                  currentPage === page.id 
                    ? 'bg-blue-100 border border-blue-300 text-blue-800' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-medium text-sm">{page.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Capítulo {GUIDE_PAGES.findIndex(p => p.id === page.id) + 1}
                    </div>
                  </div>
                </div>
              </button>
            ))}
            {filteredPages.length === 0 && (
              <div className="p-4 text-center text-sm text-gray-500">
                Nenhum capítulo encontrado.
              </div>
            )}
          </div>

          {/* Footer do Sidebar */}
          <div className="p-4 border-t border-gray-200">
            <button 
              onClick={onClose} 
              className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Fechar Guia
            </button>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 flex flex-col">
          {/* Header do Conteúdo */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{currentPageData?.title}</h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Capítulo {GUIDE_PAGES.findIndex(p => p.id === currentPage) + 1} de {GUIDE_PAGES.length}
                  </p>
                </div>
              </div>
              
              {/* Navegação */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const currentIndex = GUIDE_PAGES.findIndex(p => p.id === currentPage);
                    if (currentIndex > 0) {
                      setCurrentPage(GUIDE_PAGES[currentIndex - 1].id);
                    }
                  }}
                  disabled={GUIDE_PAGES.findIndex(p => p.id === currentPage) === 0}
                  className="px-3 py-1.5 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1 text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  Anterior
                </button>
                <button
                  onClick={() => {
                    const currentIndex = GUIDE_PAGES.findIndex(p => p.id === currentPage);
                    if (currentIndex < GUIDE_PAGES.length - 1) {
                      setCurrentPage(GUIDE_PAGES[currentIndex + 1].id);
                    }
                  }}
                  disabled={GUIDE_PAGES.findIndex(p => p.id === currentPage) === GUIDE_PAGES.length - 1}
                  className="px-3 py-1.5 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1 text-sm"
                >
                  Próximo
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Conteúdo Markdown */}
          <div className="flex-1 overflow-auto p-6" ref={contentRef}>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Carregando...</span>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({children}) => <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-3">{children}</h1>,
                    h2: ({children}) => <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">{children}</h2>,
                    h3: ({children}) => <h3 className="text-xl font-medium text-gray-700 mb-3 mt-6">{children}</h3>,
                    h4: ({children}) => <h4 className="text-lg font-medium text-gray-700 mb-2 mt-4">{children}</h4>,
                    p: ({children}) => <p className="text-gray-600 mb-4 leading-relaxed">{children}</p>,
                    ul: ({children}) => <ul className="list-disc list-inside mb-4 ml-4 text-gray-600">{children}</ul>,
                    ol: ({children}) => <ol className="list-decimal list-inside mb-4 ml-4 text-gray-600">{children}</ol>,
                    li: ({children}) => <li className="mb-2">{children}</li>,
                    strong: ({children}) => <strong className="font-semibold text-gray-800">{children}</strong>,
                    em: ({children}) => <em className="italic text-gray-700">{children}</em>,
                    code: ({children}) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-blue-600">{children}</code>,
                    blockquote: ({children}) => <blockquote className="border-l-4 border-blue-500 pl-6 my-6 italic text-gray-700 bg-blue-50 py-4 rounded-r-lg">{children}</blockquote>,
                    table: ({children}) => <div className="overflow-x-auto my-6"><table className="min-w-full border-collapse border border-gray-300 rounded-lg">{children}</table></div>,
                    thead: ({children}) => <thead className="bg-gray-100">{children}</thead>,
                    tbody: ({children}) => <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>,
                    tr: ({children}) => <tr className="hover:bg-gray-50">{children}</tr>,
                    th: ({children}) => <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider border border-gray-300">{children}</th>,
                    td: ({children}) => <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 border border-gray-300 text-center">{children}</td>,
                    hr: () => <hr className="my-8 border-gray-300" />,
                  }}
                >
                  {allGuidesContent[currentPage]}
                </ReactMarkdown>
              </div>
            )}
          </div>

          {/* Footer de Navegação */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {GUIDE_PAGES.findIndex(p => p.id === currentPage) + 1} de {GUIDE_PAGES.length} capítulos
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const currentIndex = GUIDE_PAGES.findIndex(p => p.id === currentPage);
                    if (currentIndex > 0) {
                      setCurrentPage(GUIDE_PAGES[currentIndex - 1].id);
                    }
                  }}
                  disabled={GUIDE_PAGES.findIndex(p => p.id === currentPage) === 0}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  {GUIDE_PAGES.findIndex(p => p.id === currentPage) > 0 ? GUIDE_PAGES[GUIDE_PAGES.findIndex(p => p.id === currentPage) - 1].title : 'Anterior'}
                </button>
                <button
                  onClick={() => {
                    const currentIndex = GUIDE_PAGES.findIndex(p => p.id === currentPage);
                    if (currentIndex < GUIDE_PAGES.length - 1) {
                      setCurrentPage(GUIDE_PAGES[currentIndex + 1].id);
                    }
                  }}
                  disabled={GUIDE_PAGES.findIndex(p => p.id === currentPage) === GUIDE_PAGES.length - 1}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm"
                >
                  {GUIDE_PAGES.findIndex(p => p.id === currentPage) < GUIDE_PAGES.length - 1 ? GUIDE_PAGES[GUIDE_PAGES.findIndex(p => p.id === currentPage) + 1].title : 'Próximo'}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}