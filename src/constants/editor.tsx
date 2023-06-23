export const LANGUAGES = {
    PYTHON: {
      name: 'Python3',
      mode: 'python',
      mime: 'text/x-python',
      extension: '.py',
    },
    JAVA: {
      name: 'Java',
      mode: 'text/x-java',
      mime: 'text/x-java',
      extension: '.java',
    },
    JAVASCRIPT: {
      name: 'JavaScript',
      mode: 'javascript',
      mime: 'text/javascript',
      extension: '.js',
    },
    CPP: {
      name: 'C++',
      mode: 'text/x-c++src',
      mime: 'text/x-c++src',
      extension: '.cpp',
    },
    RUBY: {
      name: 'Ruby',
      mode: 'ruby',
      mime: 'text/x-ruby',
      extension: '.rb',
    },
  };
  
  export type LanguageType = keyof typeof LANGUAGES;
  
  export interface LanguageOptions {
    name: string;
    mode: string;
    mime: string;
    extension: string;
  }
  
  export type Languages = { [K in LanguageType]: LanguageOptions };
  