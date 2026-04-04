var DennerBundle = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/compiler/lexer.ts
  var lexer_exports = {};
  __export(lexer_exports, {
    Lexer: () => Lexer,
    TokenType: () => TokenType
  });
  var TokenType, Keywords, TypeKeywords, Lexer;
  var init_lexer = __esm({
    "src/compiler/lexer.ts"() {
      TokenType = /* @__PURE__ */ ((TokenType2) => {
        TokenType2["IDENTIFIER"] = "IDENTIFIER";
        TokenType2["NUMBER_LITERAL"] = "NUMBER_LITERAL";
        TokenType2["STRING_LITERAL"] = "STRING_LITERAL";
        TokenType2["BOOLEAN_LITERAL"] = "BOOLEAN_LITERAL";
        TokenType2["FUNCTION"] = "FUNCTION";
        TokenType2["RETURN"] = "RETURN";
        TokenType2["IF"] = "IF";
        TokenType2["ELSE"] = "ELSE";
        TokenType2["FOR"] = "FOR";
        TokenType2["IN"] = "IN";
        TokenType2["IMPORT"] = "IMPORT";
        TokenType2["EXPORT"] = "EXPORT";
        TokenType2["AS"] = "AS";
        TokenType2["WHILE"] = "WHILE";
        TokenType2["OBSERVE"] = "OBSERVE";
        TokenType2["CLASS"] = "CLASS";
        TokenType2["THIS"] = "THIS";
        TokenType2["TYPE_NUM"] = "TYPE_NUM";
        TokenType2["TYPE_STR"] = "TYPE_STR";
        TokenType2["TYPE_BOOL"] = "TYPE_BOOL";
        TokenType2["TYPE_LIST"] = "TYPE_LIST";
        TokenType2["TYPE_OBJ"] = "TYPE_OBJ";
        TokenType2["TYPE_ELEMENT"] = "TYPE_ELEMENT";
        TokenType2["ASSIGN"] = "ASSIGN";
        TokenType2["COLON"] = "COLON";
        TokenType2["LBRACE"] = "LBRACE";
        TokenType2["RBRACE"] = "RBRACE";
        TokenType2["LPAREN"] = "LPAREN";
        TokenType2["RPAREN"] = "RPAREN";
        TokenType2["LBRACKET"] = "LBRACKET";
        TokenType2["RBRACKET"] = "RBRACKET";
        TokenType2["COMMA"] = "COMMA";
        TokenType2["DOT"] = "DOT";
        TokenType2["DOT_DOT"] = "DOT_DOT";
        TokenType2["PLUS"] = "PLUS";
        TokenType2["MINUS"] = "MINUS";
        TokenType2["STAR"] = "STAR";
        TokenType2["SLASH"] = "SLASH";
        TokenType2["GT"] = "GT";
        TokenType2["LT"] = "LT";
        TokenType2["GE"] = "GE";
        TokenType2["LE"] = "LE";
        TokenType2["EQ_EQ"] = "EQ_EQ";
        TokenType2["NOT_EQ"] = "NOT_EQ";
        TokenType2["AND"] = "AND";
        TokenType2["OR"] = "OR";
        TokenType2["NOT"] = "NOT";
        TokenType2["MODULO"] = "MODULO";
        TokenType2["EOF"] = "EOF";
        TokenType2["NEWLINE"] = "NEWLINE";
        return TokenType2;
      })(TokenType || {});
      Keywords = {
        function: "FUNCTION" /* FUNCTION */,
        return: "RETURN" /* RETURN */,
        if: "IF" /* IF */,
        else: "ELSE" /* ELSE */,
        for: "FOR" /* FOR */,
        in: "IN" /* IN */,
        import: "IMPORT" /* IMPORT */,
        export: "EXPORT" /* EXPORT */,
        as: "AS" /* AS */,
        while: "WHILE" /* WHILE */,
        observe: "OBSERVE" /* OBSERVE */,
        class: "CLASS" /* CLASS */,
        this: "THIS" /* THIS */,
        true: "BOOLEAN_LITERAL" /* BOOLEAN_LITERAL */,
        false: "BOOLEAN_LITERAL" /* BOOLEAN_LITERAL */,
        and: "AND" /* AND */,
        or: "OR" /* OR */,
        not: "NOT" /* NOT */
      };
      TypeKeywords = {
        num: "TYPE_NUM" /* TYPE_NUM */,
        str: "TYPE_STR" /* TYPE_STR */,
        bool: "TYPE_BOOL" /* TYPE_BOOL */,
        list: "TYPE_LIST" /* TYPE_LIST */,
        obj: "TYPE_OBJ" /* TYPE_OBJ */,
        element: "TYPE_ELEMENT" /* TYPE_ELEMENT */
      };
      Lexer = class {
        constructor(source) {
          this.position = 0;
          this.line = 1;
          this.column = 1;
          this.source = source;
        }
        tokenize() {
          const tokens = [];
          while (this.position < this.source.length) {
            const leadingSpace = this.skipWhitespace();
            if (this.position >= this.source.length) break;
            const char = this.peek();
            if (char === "\n") {
              const lastToken = tokens[tokens.length - 1];
              if (lastToken && lastToken.type !== "NEWLINE" /* NEWLINE */) {
                tokens.push(this.createToken("NEWLINE" /* NEWLINE */, "\n", leadingSpace));
              }
              this.advance();
              this.line++;
              this.column = 1;
              continue;
            }
            if (char === "/" && this.peek(1) === "/") {
              this.skipComment();
              continue;
            }
            if (this.isDigit(char)) {
              tokens.push(this.readNumber(leadingSpace));
            } else if (this.isAlpha(char)) {
              tokens.push(this.readIdentifierOrKeyword(leadingSpace));
            } else if (char === '"') {
              tokens.push(this.readString(leadingSpace));
            } else {
              tokens.push(this.readSymbol(leadingSpace));
            }
          }
          tokens.push(this.createToken("EOF" /* EOF */, "", ""));
          const cleaned = [];
          for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].type === "NEWLINE" /* NEWLINE */ && tokens[i + 1]?.type === "EOF" /* EOF */) {
              continue;
            }
            cleaned.push(tokens[i]);
          }
          return cleaned;
        }
        peek(offset = 0) {
          if (this.position + offset >= this.source.length) return "\0";
          return this.source[this.position + offset];
        }
        advance() {
          const char = this.source[this.position];
          this.position++;
          this.column++;
          return char;
        }
        skipWhitespace() {
          let space = "";
          while (this.position < this.source.length) {
            const char = this.peek();
            if (char === " " || char === "\r" || char === "	") {
              space += char;
              this.advance();
            } else {
              break;
            }
          }
          return space;
        }
        skipComment() {
          while (this.position < this.source.length && this.peek() !== "\n") {
            this.advance();
          }
        }
        isDigit(char) {
          return char >= "0" && char <= "9";
        }
        isAlpha(char) {
          return char >= "a" && char <= "z" || char >= "A" && char <= "Z" || char === "_";
        }
        isAlphaNumeric(char) {
          return this.isAlpha(char) || this.isDigit(char);
        }
        readNumber(leadingSpace) {
          let value = "";
          const startCol = this.column;
          while (this.isDigit(this.peek()) || this.peek() === ".") {
            if (this.peek() === "." && this.peek(1) === ".") {
              break;
            }
            value += this.advance();
          }
          return { type: "NUMBER_LITERAL" /* NUMBER_LITERAL */, value, line: this.line, column: startCol, leadingSpace };
        }
        readIdentifierOrKeyword(leadingSpace) {
          let value = "";
          const startCol = this.column;
          while (this.isAlphaNumeric(this.peek())) {
            value += this.advance();
          }
          let type = "IDENTIFIER" /* IDENTIFIER */;
          if (Object.prototype.hasOwnProperty.call(Keywords, value)) {
            type = Keywords[value];
          } else if (Object.prototype.hasOwnProperty.call(TypeKeywords, value)) {
            type = TypeKeywords[value];
          }
          return { type, value, line: this.line, column: startCol, leadingSpace };
        }
        readString(leadingSpace) {
          const startCol = this.column;
          this.advance();
          let value = "";
          while (this.position < this.source.length && this.peek() !== '"') {
            value += this.advance();
          }
          this.advance();
          return { type: "STRING_LITERAL" /* STRING_LITERAL */, value, line: this.line, column: startCol, leadingSpace };
        }
        readSymbol(leadingSpace) {
          const char = this.peek();
          const startCol = this.column;
          switch (char) {
            case "=":
              this.advance();
              if (this.peek() === "=") {
                this.advance();
                return { type: "EQ_EQ" /* EQ_EQ */, value: "==", line: this.line, column: startCol, leadingSpace };
              }
              return { type: "ASSIGN" /* ASSIGN */, value: "=", line: this.line, column: startCol, leadingSpace };
            case ":":
              this.advance();
              return { type: "COLON" /* COLON */, value: ":", line: this.line, column: startCol, leadingSpace };
            case "{":
              this.advance();
              return { type: "LBRACE" /* LBRACE */, value: "{", line: this.line, column: startCol, leadingSpace };
            case "}":
              this.advance();
              return { type: "RBRACE" /* RBRACE */, value: "}", line: this.line, column: startCol, leadingSpace };
            case "(":
              this.advance();
              return { type: "LPAREN" /* LPAREN */, value: "(", line: this.line, column: startCol, leadingSpace };
            case ")":
              this.advance();
              return { type: "RPAREN" /* RPAREN */, value: ")", line: this.line, column: startCol, leadingSpace };
            case "[":
              this.advance();
              return { type: "LBRACKET" /* LBRACKET */, value: "[", line: this.line, column: startCol, leadingSpace };
            case "]":
              this.advance();
              return { type: "RBRACKET" /* RBRACKET */, value: "]", line: this.line, column: startCol, leadingSpace };
            case ",":
              this.advance();
              return { type: "COMMA" /* COMMA */, value: ",", line: this.line, column: startCol, leadingSpace };
            case ".":
              this.advance();
              if (this.peek() === ".") {
                this.advance();
                return { type: "DOT_DOT" /* DOT_DOT */, value: "..", line: this.line, column: startCol, leadingSpace };
              }
              return { type: "DOT" /* DOT */, value: ".", line: this.line, column: startCol, leadingSpace };
            case "+":
              this.advance();
              return { type: "PLUS" /* PLUS */, value: "+", line: this.line, column: startCol, leadingSpace };
            case "-":
              this.advance();
              return { type: "MINUS" /* MINUS */, value: "-", line: this.line, column: startCol, leadingSpace };
            case "*":
              this.advance();
              return { type: "STAR" /* STAR */, value: "*", line: this.line, column: startCol, leadingSpace };
            case "/":
              this.advance();
              return { type: "SLASH" /* SLASH */, value: "/", line: this.line, column: startCol, leadingSpace };
            case "%":
              this.advance();
              return { type: "MODULO" /* MODULO */, value: "%", line: this.line, column: startCol, leadingSpace };
            case ">":
              this.advance();
              if (this.peek() === "=") {
                this.advance();
                return { type: "GE" /* GE */, value: ">=", line: this.line, column: startCol, leadingSpace };
              }
              return { type: "GT" /* GT */, value: ">", line: this.line, column: startCol, leadingSpace };
            case "<":
              this.advance();
              if (this.peek() === "=") {
                this.advance();
                return { type: "LE" /* LE */, value: "<=", line: this.line, column: startCol, leadingSpace };
              }
              return { type: "LT" /* LT */, value: "<", line: this.line, column: startCol, leadingSpace };
            case "!":
              this.advance();
              if (this.peek() === "=") {
                this.advance();
                return { type: "NOT_EQ" /* NOT_EQ */, value: "!=", line: this.line, column: startCol, leadingSpace };
              }
              return { type: "IDENTIFIER" /* IDENTIFIER */, value: "!", line: this.line, column: startCol, leadingSpace };
            // treat stray bangs as identifiers for JSX 
            default:
              this.advance();
              return { type: "IDENTIFIER" /* IDENTIFIER */, value: char, line: this.line, column: startCol, leadingSpace };
          }
        }
        createToken(type, value, leadingSpace) {
          return { type, value, line: this.line, column: this.column, leadingSpace };
        }
      };
    }
  });

  // src/browser-entry.ts
  var browser_entry_exports = {};
  __export(browser_entry_exports, {
    DennerElement: () => DennerElement,
    Interpreter: () => Interpreter,
    JSCodeGenerator: () => JSCodeGenerator,
    Lexer: () => Lexer,
    Parser: () => Parser,
    Resolver: () => Resolver,
    RuntimeError: () => RuntimeError,
    TokenType: () => TokenType,
    TypeChecker: () => TypeChecker,
    TypeError: () => TypeError2
  });
  init_lexer();

  // src/compiler/parser.ts
  init_lexer();
  var Parser = class _Parser {
    constructor(tokens) {
      this.current = 0;
      this.tokens = tokens;
    }
    parse() {
      const statements = [];
      while (!this.isAtEnd()) {
        if (this.match("NEWLINE" /* NEWLINE */)) continue;
        statements.push(this.parseStatement());
      }
      return {
        type: "Program",
        body: statements,
        line: 1
      };
    }
    parseStatement() {
      if (this.match("EXPORT" /* EXPORT */)) {
        return this.parseExportStatement();
      }
      if (this.match("IMPORT" /* IMPORT */)) {
        return this.parseImportStatement();
      }
      if (this.match("FUNCTION" /* FUNCTION */)) {
        return this.parseFunctionDeclaration();
      }
      if (this.match("IF" /* IF */)) {
        return this.parseIfStatement();
      }
      if (this.match("FOR" /* FOR */)) {
        return this.parseForStatement();
      }
      if (this.match("RETURN" /* RETURN */)) {
        return this.parseReturnStatement();
      }
      if (this.match("WHILE" /* WHILE */)) {
        return this.parseWhileStatement();
      }
      if (this.match("CLASS" /* CLASS */)) {
        return this.parseClassDeclaration();
      }
      if (this.check("IDENTIFIER" /* IDENTIFIER */)) {
        const next = this.peek(1).type;
        const isDecl = next === "COLON" /* COLON */ || next === "OBSERVE" /* OBSERVE */;
        if (isDecl) {
          return this.parseVariableDeclaration();
        }
      }
      return this.parseExpressionStatement();
    }
    // --- Statement Parsers ---
    parseExportStatement() {
      const line = this.previous().line;
      if (this.match("FUNCTION" /* FUNCTION */)) {
        const funcDecl = this.parseFunctionDeclaration(true);
        return {
          type: "ExportStatement",
          declaration: funcDecl,
          line
        };
      } else if (this.check("IDENTIFIER" /* IDENTIFIER */)) {
        const varDecl = this.parseVariableDeclaration();
        return {
          type: "ExportStatement",
          declaration: varDecl,
          line
        };
      }
      throw this.error(this.peek(), "Expected function or variable declaration after 'export'.");
    }
    parseImportStatement() {
      const line = this.previous().line;
      const sourceToken = this.consume("STRING_LITERAL" /* STRING_LITERAL */, "Expected string literal after 'import'.");
      let alias = null;
      if (this.match("AS" /* AS */)) {
        const aliasToken = this.consume("IDENTIFIER" /* IDENTIFIER */, "Expected identifier after 'as'.");
        alias = aliasToken.value;
      }
      this.consumeStatementEnd();
      return {
        type: "ImportStatement",
        source: sourceToken.value,
        alias,
        line
      };
    }
    parseFunctionDeclaration(isAlreadyParsedFunctionKeyword = false) {
      if (!isAlreadyParsedFunctionKeyword) {
      }
      const line = this.previous().line;
      const idToken = this.consume("IDENTIFIER" /* IDENTIFIER */, "Expected function name.");
      this.consume("LPAREN" /* LPAREN */, "Expected '(' after function name.");
      const params = [];
      if (!this.check("RPAREN" /* RPAREN */)) {
        do {
          const paramId = this.consume("IDENTIFIER" /* IDENTIFIER */, "Expected parameter name.");
          this.consume("COLON" /* COLON */, "Expected ':' after parameter name.");
          const typeToken = this.advance();
          params.push({
            id: { type: "Identifier", name: paramId.value, line: paramId.line },
            typeAnnotation: this.getTypeString(typeToken)
          });
        } while (this.match("COMMA" /* COMMA */));
      }
      this.consume("RPAREN" /* RPAREN */, "Expected ')' after parameters.");
      let returnType = "void";
      if (this.match("COLON" /* COLON */)) {
        const typeToken = this.advance();
        returnType = this.getTypeString(typeToken);
      }
      while (this.match("NEWLINE" /* NEWLINE */)) ;
      const body = this.parseBlock();
      return {
        type: "FunctionDeclaration",
        id: { type: "Identifier", name: idToken.value, line: idToken.line },
        params,
        returnType,
        body,
        line
      };
    }
    parseVariableDeclaration() {
      const idToken = this.consume("IDENTIFIER" /* IDENTIFIER */, "Expected variable name.");
      const line = idToken.line;
      let typeAnnotation = null;
      if (this.match("COLON" /* COLON */)) {
        const typeToken = this.advance();
        typeAnnotation = this.getTypeString(typeToken);
      }
      let isObserved = false;
      if (this.match("OBSERVE" /* OBSERVE */)) {
        isObserved = true;
      }
      this.consume("ASSIGN" /* ASSIGN */, "Expected '=' after variable name.");
      const init = this.parseExpression();
      this.consumeStatementEnd();
      return {
        type: "VariableDeclaration",
        id: { type: "Identifier", name: idToken.value, line: idToken.line },
        typeAnnotation,
        isObserved,
        init,
        line
      };
    }
    parseIfStatement() {
      const line = this.previous().line;
      const test = this.parseExpression();
      while (this.match("NEWLINE" /* NEWLINE */)) ;
      const consequent = this.parseBlock();
      let alternate = null;
      if (this.match("ELSE" /* ELSE */)) {
        if (this.match("IF" /* IF */)) {
          alternate = this.parseIfStatement();
        } else {
          while (this.match("NEWLINE" /* NEWLINE */)) ;
          alternate = this.parseBlock();
        }
      }
      return {
        type: "IfStatement",
        test,
        consequent,
        alternate,
        line
      };
    }
    parseForStatement() {
      const line = this.previous().line;
      const iterators = [];
      iterators.push({ type: "Identifier", name: this.consume("IDENTIFIER" /* IDENTIFIER */, "Expected identifier in for loop.").value, line });
      if (this.match("COMMA" /* COMMA */)) {
        iterators.push({ type: "Identifier", name: this.consume("IDENTIFIER" /* IDENTIFIER */, "Expected second identifier in for loop.").value, line });
      }
      this.consume("IN" /* IN */, "Expected 'in' after for loop identifiers.");
      const exprOrRangeStart = this.parseExpression();
      if (this.match("DOT_DOT" /* DOT_DOT */)) {
        if (iterators.length > 1) {
          throw new Error("Range loop only supports a single iterator.");
        }
        const rangeEnd = this.parseExpression();
        while (this.match("NEWLINE" /* NEWLINE */)) ;
        const body = this.parseBlock();
        return {
          type: "ForRangeStatement",
          iterator: iterators[0],
          start: exprOrRangeStart,
          end: rangeEnd,
          body,
          line
        };
      } else {
        while (this.match("NEWLINE" /* NEWLINE */)) ;
        const body = this.parseBlock();
        return {
          type: "ForInStatement",
          iterators,
          iterable: exprOrRangeStart,
          body,
          line
        };
      }
    }
    parseWhileStatement() {
      const line = this.previous().line;
      const test = this.parseExpression();
      while (this.match("NEWLINE" /* NEWLINE */)) ;
      const body = this.parseBlock();
      return {
        type: "WhileStatement",
        test,
        body,
        line
      };
    }
    parseReturnStatement() {
      const line = this.previous().line;
      let argument = null;
      if (!this.check("NEWLINE" /* NEWLINE */) && !this.check("RBRACE" /* RBRACE */) && !this.isAtEnd()) {
        argument = this.parseExpression();
      }
      this.consumeStatementEnd();
      return {
        type: "ReturnStatement",
        argument,
        line
      };
    }
    parseBlock() {
      const line = this.peek().line;
      this.consume("LBRACE" /* LBRACE */, "Expected '{' to start block.");
      const statements = [];
      while (!this.check("RBRACE" /* RBRACE */) && !this.isAtEnd()) {
        if (this.match("NEWLINE" /* NEWLINE */)) continue;
        statements.push(this.parseStatement());
      }
      this.consume("RBRACE" /* RBRACE */, "Expected '}' to end block.");
      this.match("NEWLINE" /* NEWLINE */);
      return {
        type: "BlockStatement",
        body: statements,
        line
      };
    }
    parseExpressionStatement() {
      const expr = this.parseExpression();
      const line = expr.line;
      if (this.match("ASSIGN" /* ASSIGN */)) {
        const operator = this.previous().value;
        const right = this.parseExpression();
        this.consumeStatementEnd();
        if (expr.type !== "Identifier" && expr.type !== "MemberExpression") {
          throw this.error(this.previous(), "Invalid assignment target.");
        }
        return {
          type: "ExpressionStatement",
          expression: {
            type: "AssignmentExpression",
            left: expr,
            operator,
            right,
            line
          },
          line
        };
      }
      this.consumeStatementEnd();
      return {
        type: "ExpressionStatement",
        expression: expr,
        line
      };
    }
    // --- Expression Parsers ---
    parseExpression() {
      return this.parseOr();
    }
    parseOr() {
      let expr = this.parseAnd();
      while (this.match("OR" /* OR */)) {
        const operator = this.previous().value;
        const right = this.parseAnd();
        expr = {
          type: "BinaryExpression",
          left: expr,
          operator,
          right,
          line: expr.line
        };
      }
      return expr;
    }
    parseAnd() {
      let expr = this.parseEquality();
      while (this.match("AND" /* AND */)) {
        const operator = this.previous().value;
        const right = this.parseEquality();
        expr = {
          type: "BinaryExpression",
          left: expr,
          operator,
          right,
          line: expr.line
        };
      }
      return expr;
    }
    parseEquality() {
      let expr = this.parseComparison();
      while (this.match("EQ_EQ" /* EQ_EQ */) || this.match("NOT_EQ" /* NOT_EQ */)) {
        const operator = this.previous().value;
        const right = this.parseComparison();
        expr = {
          type: "BinaryExpression",
          left: expr,
          operator,
          right,
          line: expr.line
        };
      }
      return expr;
    }
    parseComparison() {
      let expr = this.parseTerm();
      while (this.match("GT" /* GT */) || this.match("LT" /* LT */) || this.match("GE" /* GE */) || this.match("LE" /* LE */)) {
        const operator = this.previous().value;
        const right = this.parseTerm();
        expr = {
          type: "BinaryExpression",
          left: expr,
          operator,
          right,
          line: expr.line
        };
      }
      return expr;
    }
    parseTerm() {
      let expr = this.parseFactor();
      while (this.match("PLUS" /* PLUS */) || this.match("MINUS" /* MINUS */)) {
        const operator = this.previous().value;
        const right = this.parseFactor();
        expr = {
          type: "BinaryExpression",
          left: expr,
          operator,
          right,
          line: expr.line
        };
      }
      return expr;
    }
    parseFactor() {
      let expr = this.parseUnary();
      while (this.match("STAR" /* STAR */) || this.match("SLASH" /* SLASH */) || this.match("MODULO" /* MODULO */)) {
        const operator = this.previous().value;
        const right = this.parseUnary();
        expr = {
          type: "BinaryExpression",
          left: expr,
          operator,
          right,
          line: expr.line
        };
      }
      return expr;
    }
    parseUnary() {
      if (this.match("MINUS" /* MINUS */) || this.match("NOT" /* NOT */)) {
        const operator = this.previous().value;
        const argument = this.parseUnary();
        return {
          type: "UnaryExpression",
          operator,
          argument,
          line: argument.line
        };
      }
      return this.parseCall();
    }
    parseCall() {
      let expr = this.parsePrimary();
      while (true) {
        if (this.match("LPAREN" /* LPAREN */)) {
          expr = this.finishCall(expr);
        } else if (this.match("DOT" /* DOT */)) {
          const name = this.consume("IDENTIFIER" /* IDENTIFIER */, "Expected property name after '.'.");
          expr = {
            type: "MemberExpression",
            object: expr,
            property: { type: "Identifier", name: name.value, line: name.line },
            computed: false,
            line: expr.line
          };
        } else if (this.match("LBRACKET" /* LBRACKET */)) {
          const indexExpr = this.parseExpression();
          this.consume("RBRACKET" /* RBRACKET */, "Expected ']' after index.");
          expr = {
            type: "MemberExpression",
            object: expr,
            property: indexExpr,
            computed: true,
            line: expr.line
          };
        } else {
          break;
        }
      }
      return expr;
    }
    finishCall(callee) {
      const args = [];
      if (!this.check("RPAREN" /* RPAREN */)) {
        do {
          this.match("NEWLINE" /* NEWLINE */);
          args.push(this.parseExpression());
          this.match("NEWLINE" /* NEWLINE */);
        } while (this.match("COMMA" /* COMMA */));
      }
      const paren = this.consume("RPAREN" /* RPAREN */, "Expected ')' after arguments.");
      return {
        type: "CallExpression",
        callee,
        arguments: args,
        line: paren.line
      };
    }
    parsePrimary() {
      const token = this.advance();
      switch (token.type) {
        case "NUMBER_LITERAL" /* NUMBER_LITERAL */:
          return { type: "NumberLiteral", value: parseFloat(token.value), line: token.line };
        case "STRING_LITERAL" /* STRING_LITERAL */:
          return this.parseInterpolatedString(token.value, token.line);
        case "BOOLEAN_LITERAL" /* BOOLEAN_LITERAL */:
          return { type: "BooleanLiteral", value: token.value === "true", line: token.line };
        case "IDENTIFIER" /* IDENTIFIER */:
          return { type: "Identifier", name: token.value, line: token.line };
        case "THIS" /* THIS */:
          return { type: "Identifier", name: "this", line: token.line };
        case "LPAREN" /* LPAREN */:
          const expr = this.parseExpression();
          this.consume("RPAREN" /* RPAREN */, "Expected ')' after expression.");
          return expr;
        case "LBRACE" /* LBRACE */:
          return this.parseObjectLiteral();
        case "FUNCTION" /* FUNCTION */:
          return this.parseFunctionExpression();
        case "LBRACKET" /* LBRACKET */:
          return this.parseListLiteral();
        case "MINUS" /* MINUS */:
        case "PLUS" /* PLUS */: {
          const operator = token.value;
          const argument = this.parsePrimary();
          return { type: "UnaryExpression", operator, argument, line: token.line };
        }
        case "LT" /* LT */:
          return this.parseElementLiteral(token.line);
        default:
          throw this.error(token, `Unexpected token in primary expression: ${token.value} (${token.type})`);
      }
    }
    parseFunctionExpression() {
      const line = this.previous().line;
      this.consume("LPAREN" /* LPAREN */, "Expected '(' after 'function'.");
      const params = [];
      if (!this.check("RPAREN" /* RPAREN */)) {
        do {
          const id = this.consume("IDENTIFIER" /* IDENTIFIER */, "Expected parameter name.");
          let typeAnnotation = "any";
          if (this.match("COLON" /* COLON */)) {
            typeAnnotation = this.getTypeString(this.advance());
          }
          params.push({ id: { type: "Identifier", name: id.value, line: id.line }, typeAnnotation });
        } while (this.match("COMMA" /* COMMA */));
      }
      this.consume("RPAREN" /* RPAREN */, "Expected ')' after parameters.");
      let returnType = "void";
      if (this.match("COLON" /* COLON */)) {
        returnType = this.getTypeString(this.advance());
      }
      const body = this.parseBlock();
      return { type: "FunctionExpression", params, returnType, body, line };
    }
    parseObjectLiteral() {
      const line = this.previous().line;
      const properties = [];
      while (!this.check("RBRACE" /* RBRACE */) && !this.isAtEnd()) {
        this.match("NEWLINE" /* NEWLINE */);
        if (this.check("RBRACE" /* RBRACE */)) break;
        const keyToken = this.consume("IDENTIFIER" /* IDENTIFIER */, "Expected property name.");
        this.consume("COLON" /* COLON */, "Expected ':' after property name.");
        const value = this.parseExpression();
        properties.push({ key: keyToken.value, value, line: keyToken.line });
        this.match("NEWLINE" /* NEWLINE */);
        if (!this.match("COMMA" /* COMMA */)) {
          this.match("NEWLINE" /* NEWLINE */);
          break;
        }
        this.match("NEWLINE" /* NEWLINE */);
      }
      this.consume("RBRACE" /* RBRACE */, "Expected '}' after object literal.");
      return { type: "ObjectLiteral", properties, line };
    }
    parseListLiteral() {
      const line = this.previous().line;
      const elements = [];
      if (!this.check("RBRACKET" /* RBRACKET */)) {
        do {
          this.match("NEWLINE" /* NEWLINE */);
          if (this.check("RBRACKET" /* RBRACKET */)) break;
          elements.push(this.parseExpression());
          this.match("NEWLINE" /* NEWLINE */);
        } while (this.match("COMMA" /* COMMA */));
      }
      this.consume("RBRACKET" /* RBRACKET */, "Expected ']' after list literal.");
      return { type: "ListLiteral", elements, line };
    }
    parseInterpolatedString(value, line) {
      const parts = value.split(/\{([^}]+)\}/g);
      if (parts.length === 1) {
        return { type: "StringLiteral", value: parts[0], line };
      }
      let expr = { type: "StringLiteral", value: parts[0], line };
      for (let i = 1; i < parts.length; i += 2) {
        const innerSource = parts[i];
        const strPart = parts[i + 1];
        const innerLexer = new (init_lexer(), __toCommonJS(lexer_exports)).Lexer(innerSource);
        const innerTokens = innerLexer.tokenize();
        const innerParser = new _Parser(innerTokens);
        const innerExpr = innerParser.parseExpression();
        expr = {
          type: "BinaryExpression",
          left: expr,
          operator: "+",
          right: innerExpr,
          line
        };
        if (strPart) {
          expr = {
            type: "BinaryExpression",
            left: expr,
            operator: "+",
            right: { type: "StringLiteral", value: strPart, line },
            line
          };
        }
      }
      return expr;
    }
    parseElementLiteral(line) {
      let tagToken = this.peek();
      if (tagToken.type !== "IDENTIFIER" /* IDENTIFIER */ && !this.isKeywordToken(tagToken.type)) {
        throw this.error(tagToken, "Expected tag name after '<'.");
      }
      this.advance();
      const tag = tagToken.value;
      const attributes = {};
      while (!this.check("GT" /* GT */) && !this.check("SLASH" /* SLASH */) && !this.isAtEnd()) {
        if (this.match("NEWLINE" /* NEWLINE */)) continue;
        let attrToken = this.peek();
        if (attrToken.type !== "IDENTIFIER" /* IDENTIFIER */ && !this.isKeywordToken(attrToken.type)) {
          throw this.error(attrToken, "Expected attribute name.");
        }
        this.advance();
        let attrNameValue = attrToken.value;
        let attrValue = { type: "BooleanLiteral", value: true, line: attrToken.line };
        if (this.match("ASSIGN" /* ASSIGN */)) {
          if (this.match("STRING_LITERAL" /* STRING_LITERAL */)) {
            attrValue = { type: "StringLiteral", value: this.previous().value, line: this.previous().line };
          } else if (this.match("LBRACE" /* LBRACE */)) {
            attrValue = this.parseExpression();
            this.consume("RBRACE" /* RBRACE */, "Expected '}' after attribute expression.");
          } else if (this.match("NUMBER_LITERAL" /* NUMBER_LITERAL */)) {
            attrValue = { type: "NumberLiteral", value: parseFloat(this.previous().value), line: this.previous().line };
          } else {
            throw this.error(this.peek(), "Expected string, number, or {expression} for attribute value.");
          }
        }
        attributes[attrNameValue] = attrValue;
      }
      const isSelfClosing = this.match("SLASH" /* SLASH */);
      this.consume("GT" /* GT */, isSelfClosing ? "Expected '>' after '/'." : "Expected '>' after tag name.");
      const children = [];
      if (!isSelfClosing) {
        let textBuffer = "";
        let textLine = line;
        while (!this.isAtEnd()) {
          if (this.check("LT" /* LT */) && this.peek(1).type === "SLASH" /* SLASH */) {
            break;
          }
          if (this.check("LT" /* LT */)) {
            if (textBuffer.trim().length > 0) {
              children.push({ type: "StringLiteral", value: textBuffer.trim(), line: textLine });
              textBuffer = "";
            }
            this.advance();
            children.push(this.parseElementLiteral(this.previous().line));
          } else if (this.match("LBRACE" /* LBRACE */)) {
            if (textBuffer.trim().length > 0) {
              children.push({ type: "StringLiteral", value: textBuffer.trim(), line: textLine });
              textBuffer = "";
            }
            children.push(this.parseExpression());
            this.consume("RBRACE" /* RBRACE */, "Expected '}' after expression.");
          } else {
            const token = this.advance();
            if (textBuffer === "") textLine = token.line;
            textBuffer += (token.leadingSpace || "") + token.value;
          }
        }
        if (textBuffer.trim().length > 0) {
          children.push({ type: "StringLiteral", value: textBuffer.trim(), line: textLine });
        }
        this.consume("LT" /* LT */, "Expected '<' for closing tag.");
        this.consume("SLASH" /* SLASH */, "Expected '/' for closing tag.");
        let closeTagToken = this.peek();
        if (closeTagToken.type !== "IDENTIFIER" /* IDENTIFIER */ && !this.isKeywordToken(closeTagToken.type)) {
          throw this.error(closeTagToken, "Expected closing tag name.");
        }
        this.advance();
        if (closeTagToken.value !== tag) {
          throw this.error(closeTagToken, `Expected closing tag '</${tag}>', but got '</${closeTagToken.value}>'.`);
        }
        this.consume("GT" /* GT */, "Expected '>' after closing tag.");
      }
      return {
        type: "ElementLiteral",
        tag,
        attributes,
        children,
        line
      };
    }
    // --- Utilities ---
    isKeywordToken(type) {
      return type.startsWith("TYPE_") || [
        "IF" /* IF */,
        "ELSE" /* ELSE */,
        "WHILE" /* WHILE */,
        "FOR" /* FOR */,
        "IN" /* IN */,
        "RETURN" /* RETURN */,
        "FUNCTION" /* FUNCTION */,
        "CLASS" /* CLASS */,
        "THIS" /* THIS */,
        "IMPORT" /* IMPORT */,
        "EXPORT" /* EXPORT */,
        "OBSERVE" /* OBSERVE */,
        "AS" /* AS */
      ].includes(type);
    }
    match(...types) {
      for (const type of types) {
        if (this.check(type)) {
          this.advance();
          return true;
        }
      }
      return false;
    }
    check(type) {
      if (this.isAtEnd()) return false;
      return this.peek().type === type;
    }
    advance() {
      if (!this.isAtEnd()) this.current++;
      return this.previous();
    }
    isAtEnd() {
      return this.peek().type === "EOF" /* EOF */;
    }
    peek(offset = 0) {
      return this.tokens[this.current + offset];
    }
    previous() {
      return this.tokens[this.current - 1];
    }
    consume(type, message) {
      if (this.check(type)) return this.advance();
      throw this.error(this.peek(), message);
    }
    consumeStatementEnd() {
      if (this.isAtEnd()) return;
      if (this.check("RBRACE" /* RBRACE */)) return;
      if (this.check("IF" /* IF */) || this.check("WHILE" /* WHILE */) || this.check("FOR" /* FOR */) || this.check("CLASS" /* CLASS */) || this.check("FUNCTION" /* FUNCTION */) || this.check("RETURN" /* RETURN */) || this.check("EXPORT" /* EXPORT */) || this.check("IMPORT" /* IMPORT */)) return;
      this.consume("NEWLINE" /* NEWLINE */, "Expected newline to end statement.");
    }
    error(token, message) {
      return new Error(`[Line ${token.line}] Error at '${token.value}': ${message}`);
    }
    getTypeString(token) {
      switch (token.type) {
        case "TYPE_NUM" /* TYPE_NUM */:
          return "num";
        case "TYPE_STR" /* TYPE_STR */:
          return "str";
        case "TYPE_BOOL" /* TYPE_BOOL */:
          return "bool";
        case "TYPE_LIST" /* TYPE_LIST */:
          return "list";
        case "TYPE_OBJ" /* TYPE_OBJ */:
          return "obj";
        case "TYPE_ELEMENT" /* TYPE_ELEMENT */:
          return "element";
        case "IDENTIFIER" /* IDENTIFIER */:
          return token.value;
        default:
          throw new Error(`Unknown type token: ${token.type} at line ${token.line}`);
      }
    }
    parseClassDeclaration() {
      const line = this.previous().line;
      const id = this.consume("IDENTIFIER" /* IDENTIFIER */, "Expected class name.");
      while (this.match("NEWLINE" /* NEWLINE */)) ;
      this.consume("LBRACE" /* LBRACE */, "Expected '{' before class body.");
      const members = [];
      while (!this.check("RBRACE" /* RBRACE */) && !this.isAtEnd()) {
        while (this.match("NEWLINE" /* NEWLINE */)) ;
        if (this.check("RBRACE" /* RBRACE */)) break;
        if (this.match("FUNCTION" /* FUNCTION */)) {
          members.push(this.parseClassMethod());
        } else if (this.check("IDENTIFIER" /* IDENTIFIER */)) {
          members.push(this.parseClassProperty());
        } else {
          throw new Error(`Unexpected token in class body: ${this.peek().value} at line ${this.peek().line}`);
        }
      }
      this.consume("RBRACE" /* RBRACE */, "Expected '}' after class body.");
      return {
        type: "ClassDeclaration",
        id: { type: "Identifier", name: id.value, line: id.line },
        members,
        line
      };
    }
    parseClassProperty() {
      const id = this.consume("IDENTIFIER" /* IDENTIFIER */, "Expected property name.");
      const line = id.line;
      let typeAnnotation = null;
      if (this.match("COLON" /* COLON */)) {
        const typeToken = this.advance();
        typeAnnotation = this.getTypeString(typeToken);
      }
      let init = null;
      if (this.match("ASSIGN" /* ASSIGN */)) {
        init = this.parseExpression();
      }
      if (!this.check("RBRACE" /* RBRACE */)) {
        this.consumeStatementEnd();
      }
      return {
        type: "ClassProperty",
        id: { type: "Identifier", name: id.value, line: id.line },
        typeAnnotation,
        init,
        line
      };
    }
    parseClassMethod() {
      const decl = this.parseFunctionDeclaration(true);
      return {
        type: "ClassMethod",
        id: decl.id,
        params: decl.params,
        returnType: decl.returnType,
        body: decl.body,
        line: decl.line
      };
    }
  };

  // src/compiler/typechecker.ts
  var TypeError2 = class extends Error {
    constructor(message, line) {
      super(`[Line ${line}] TypeError: ${message}`);
      this.line = line;
    }
  };
  var TypeChecker = class {
    constructor(ast) {
      this.classes = /* @__PURE__ */ new Map();
      this.ast = ast;
      this.currentEnv = {
        variables: /* @__PURE__ */ new Map([
          ["log", { type: "builtin", isStrict: true }],
          ["gui", { type: "builtin", isStrict: true }],
          ["os", { type: "builtin", isStrict: true }],
          ["path", { type: "builtin", isStrict: true }],
          ["net", { type: "builtin", isStrict: true }],
          ["cli", { type: "builtin", isStrict: true }]
        ]),
        functions: /* @__PURE__ */ new Map()
      };
    }
    check() {
      this.checkProgram(this.ast);
    }
    pushEnv() {
      this.currentEnv = {
        parent: this.currentEnv,
        variables: /* @__PURE__ */ new Map(),
        functions: /* @__PURE__ */ new Map()
      };
    }
    popEnv() {
      if (this.currentEnv.parent) {
        this.currentEnv = this.currentEnv.parent;
      }
    }
    defineVar(name, type, isStrict, line) {
      if (this.currentEnv.variables.has(name)) {
        throw new TypeError2(`Variable '${name}' is already defined.`, line);
      }
      this.currentEnv.variables.set(name, { type, isStrict });
    }
    lookupVar(name, line) {
      let env = this.currentEnv;
      while (env) {
        if (env.variables.has(name)) return env.variables.get(name).type;
        env = env.parent;
      }
      throw new TypeError2(`Undefined variable '${name}'.`, line);
    }
    lookupVarMeta(name, line) {
      let env = this.currentEnv;
      while (env) {
        if (env.variables.has(name)) return env.variables.get(name);
        env = env.parent;
      }
      throw new TypeError2(`Undefined variable '${name}'.`, line);
    }
    updateVar(name, type, line) {
      let env = this.currentEnv;
      while (env) {
        if (env.variables.has(name)) {
          const meta = env.variables.get(name);
          if (meta.isStrict) {
            if (meta.type !== "unknown" && meta.type !== type && type !== "obj") {
              throw new TypeError2(`Cannot assign type ${type} to strict variable of type ${meta.type}.`, line);
            }
          } else {
            env.variables.set(name, { type, isStrict: false });
          }
          return;
        }
        env = env.parent;
      }
      throw new TypeError2(`Undefined variable '${name}'.`, line);
    }
    defineFunc(name, returnType, params, line) {
      if (this.currentEnv.functions.has(name)) {
        throw new TypeError2(`Function '${name}' is already defined.`, line);
      }
      this.currentEnv.functions.set(name, { returnType, params });
    }
    lookupFunc(name, line) {
      let env = this.currentEnv;
      while (env) {
        if (env.functions.has(name)) return env.functions.get(name);
        env = env.parent;
      }
      throw new TypeError2(`Undefined function '${name}'.`, line);
    }
    checkProgram(node) {
      for (const stmt of node.body) {
        if (stmt.type === "FunctionDeclaration") {
          const decl = stmt;
          const paramTypes = decl.params.map((p) => p.typeAnnotation);
          this.defineFunc(decl.id.name, decl.returnType, paramTypes, decl.line);
        } else if (stmt.type === "ExportStatement") {
          const decl = stmt.declaration;
          if (decl.type === "FunctionDeclaration") {
            const paramTypes = decl.params.map((p) => p.typeAnnotation);
            this.defineFunc(decl.id.name, decl.returnType, paramTypes, decl.line);
          }
        } else if (stmt.type === "ClassDeclaration") {
          const decl = stmt;
          this.registerClass(decl);
        }
      }
      for (const stmt of node.body) {
        if (stmt.type === "FunctionDeclaration") {
          this.checkFunctionDeclarationBody(stmt);
        } else if (stmt.type === "ExportStatement") {
          const decl = stmt.declaration;
          if (decl.type === "FunctionDeclaration") {
            this.checkFunctionDeclarationBody(decl);
          } else {
            this.checkVariableDeclaration(decl);
          }
        } else if (stmt.type === "ClassDeclaration") {
          this.checkClassDeclaration(stmt);
        } else {
          this.checkStatement(stmt, null);
        }
      }
    }
    checkStatement(stmt, expectedReturnType) {
      switch (stmt.type) {
        case "VariableDeclaration":
          this.checkVariableDeclaration(stmt);
          break;
        case "ExpressionStatement":
          this.checkExpression(stmt.expression);
          break;
        case "BlockStatement":
          this.pushEnv();
          for (const s of stmt.body) {
            this.checkStatement(s, expectedReturnType);
          }
          this.popEnv();
          break;
        case "IfStatement":
          const ifStmt = stmt;
          const testType = this.checkExpression(ifStmt.test);
          const flexibleBool = /* @__PURE__ */ new Set(["bool", "unknown", "builtin", "gui_method", "any"]);
          if (!flexibleBool.has(testType)) {
            throw new TypeError2(`If condition must be a boolean, got ${testType}.`, ifStmt.line);
          }
          this.checkStatement(ifStmt.consequent, expectedReturnType);
          if (ifStmt.alternate) {
            this.checkStatement(ifStmt.alternate, expectedReturnType);
          }
          break;
        case "ForRangeStatement":
          const forRange = stmt;
          const startType = this.checkExpression(forRange.start);
          const endType = this.checkExpression(forRange.end);
          if (startType !== "num" || endType !== "num") {
            throw new TypeError2(`Range loop requires 'num' for start and end, got ${startType} and ${endType}.`, forRange.line);
          }
          this.pushEnv();
          this.defineVar(forRange.iterator.name, "num", true, forRange.line);
          this.checkStatement(forRange.body, expectedReturnType);
          this.popEnv();
          break;
        case "ForInStatement": {
          const forIn = stmt;
          const iterType = this.checkExpression(forIn.iterable);
          this.pushEnv();
          if (iterType === "list") {
            forIn.iterators.forEach((id) => this.defineVar(id.name, "unknown", false, id.line));
          } else if (iterType === "obj") {
            forIn.iterators.forEach((id) => this.defineVar(id.name, "unknown", false, id.line));
          } else {
            forIn.iterators.forEach((id) => this.defineVar(id.name, "unknown", false, id.line));
          }
          this.checkStatement(forIn.body, expectedReturnType);
          this.popEnv();
          break;
        }
        case "WhileStatement": {
          const whileStmt = stmt;
          const whileTest = this.checkExpression(whileStmt.test);
          if (whileTest !== "bool" && whileTest !== "unknown") {
            throw new TypeError2(`While condition must be a boolean, got ${whileTest}.`, whileStmt.line);
          }
          this.checkStatement(whileStmt.body, expectedReturnType);
          break;
        }
        case "ClassDeclaration":
          this.checkClassDeclaration(stmt);
          break;
        case "ReturnStatement":
          if (!expectedReturnType) {
            throw new TypeError2(`Return statement not inside a function.`, stmt.line);
          }
          const retStmt = stmt;
          const actualType = retStmt.argument ? this.checkExpression(retStmt.argument) : "void";
          if (actualType !== expectedReturnType && actualType !== "unknown" && actualType !== "void") {
            throw new TypeError2(`Expected return type ${expectedReturnType}, but got ${actualType}.`, retStmt.line);
          }
          break;
        case "ImportStatement": {
          const imp = stmt;
          const alias = imp.alias || imp.source;
          if (!this.currentEnv.variables.has(alias)) {
            this.currentEnv.variables.set(alias, { type: "module", isStrict: true });
          }
          break;
        }
        case "ExportStatement": {
          const decl = stmt.declaration;
          if (decl.type === "FunctionDeclaration") {
            this.checkFunctionDeclarationBody(decl);
          } else {
            this.checkVariableDeclaration(decl);
          }
          break;
        }
      }
    }
    checkVariableDeclaration(decl) {
      const initType = this.checkExpression(decl.init);
      if (decl.typeAnnotation) {
        if (initType !== "unknown" && decl.typeAnnotation !== initType && initType !== "obj") {
          throw new TypeError2(`Cannot assign ${initType} to variable of type ${decl.typeAnnotation}.`, decl.line);
        }
      } else {
        decl.typeAnnotation = initType;
      }
      this.defineVar(decl.id.name, decl.typeAnnotation, !!decl.typeAnnotation, decl.line);
    }
    checkFunctionDeclarationBody(decl) {
      this.pushEnv();
      for (const p of decl.params) {
        this.defineVar(p.id.name, p.typeAnnotation, true, p.id.line);
      }
      for (const s of decl.body.body) {
        this.checkStatement(s, decl.returnType);
      }
      this.popEnv();
    }
    checkExpression(expr) {
      switch (expr.type) {
        case "NumberLiteral":
          return "num";
        case "StringLiteral":
          return "str";
        case "BooleanLiteral":
          return "bool";
        case "Identifier":
          return this.lookupVar(expr.name, expr.line);
        case "BinaryExpression":
          return this.checkBinaryExpression(expr);
        case "AssignmentExpression":
          return this.checkAssignmentExpression(expr);
        case "CallExpression":
          return this.checkCallExpression(expr);
        case "MemberExpression": {
          const mem = expr;
          if (!mem.computed && mem.object.type === "Identifier") {
            const name = mem.object.name;
            if (["log", "gui", "os", "path", "net", "cli", "string"].includes(name)) {
              return "builtin";
            }
          }
          const objType = this.checkExpression(mem.object);
          if (objType === "builtin") return "builtin";
          if (objType === "gui_object") return "gui_method";
          return "unknown";
        }
        case "ObjectLiteral":
          return "obj";
        case "FunctionExpression":
          return "function";
        case "ListLiteral":
          return "list";
        case "ElementLiteral":
          return "element";
        case "UnaryExpression": {
          const un = expr;
          if (un.operator === "not") return "bool";
          return "num";
        }
      }
      throw new Error(`Unknown expression type: ${expr.type}`);
    }
    checkBinaryExpression(expr) {
      const leftType = this.checkExpression(expr.left);
      const rightType = this.checkExpression(expr.right);
      if (["+", "-", "*", "/", "%"].includes(expr.operator)) {
        if (expr.operator === "+" && (leftType === "str" || rightType === "str")) return "str";
        const flexTypes = /* @__PURE__ */ new Set(["unknown", "gui_method", "builtin", "module", "any"]);
        if (flexTypes.has(leftType) || flexTypes.has(rightType)) return "num";
        if (leftType !== "num" || rightType !== "num") {
          throw new TypeError2(`Operator ${expr.operator} requires 'num', got ${leftType} and ${rightType}.`, expr.line);
        }
        return "num";
      }
      if (["==", "!=", "<", ">", "<=", ">="].includes(expr.operator)) {
        const flexible = /* @__PURE__ */ new Set(["unknown", "builtin", "gui_method", "any"]);
        if (flexible.has(leftType) || flexible.has(rightType)) return "bool";
        if (leftType !== rightType) {
          throw new TypeError2(`Cannot compare ${leftType} with ${rightType}.`, expr.line);
        }
        return "bool";
      }
      if (["&&", "||", "and", "or"].includes(expr.operator)) return "bool";
      return "unknown";
    }
    checkAssignmentExpression(expr) {
      const rightType = this.checkExpression(expr.right);
      if (expr.left.type === "Identifier") {
        const leftId = expr.left;
        try {
          this.updateVar(leftId.name, rightType, expr.line);
        } catch (e) {
          if (e instanceof TypeError2 && e.message.includes("Undefined variable")) {
            this.defineVar(leftId.name, rightType, false, leftId.line);
            expr.isDeclaration = true;
            expr.declType = rightType;
          } else {
            throw e;
          }
        }
      } else if (expr.left.type === "MemberExpression") {
        const memberExpr = expr.left;
        if (memberExpr.object.type === "Identifier" && memberExpr.object.name === "this") {
          return rightType;
        }
      }
      return rightType;
    }
    checkCallExpression(expr) {
      if (expr.callee.type === "Identifier") {
        const name = expr.callee.name;
        const func = this.lookupFunc(name, expr.line);
        if (expr.arguments.length !== func.params.length) {
          throw new TypeError2(`Function '${name}' expects ${func.params.length} arguments, got ${expr.arguments.length}.`, expr.line);
        }
        for (let i = 0; i < expr.arguments.length; i++) {
          const argType = this.checkExpression(expr.arguments[i]);
          if (argType !== func.params[i] && argType !== "unknown") {
            throw new TypeError2(`Argument ${i + 1} of '${name}' expected ${func.params[i]}, got ${argType}.`, expr.line);
          }
        }
        return func.returnType;
      } else if (expr.callee.type === "MemberExpression") {
        const mem = expr.callee;
        const calleeType = this.checkExpression(mem);
        if (calleeType === "gui_method" && !mem.computed) {
          const propName = mem.property.name;
          if (propName === "enablePhysics" || propName === "on") return "gui_object";
        }
        if (mem.object.type === "Identifier" && !mem.computed) {
          const objName = mem.object.name;
          const propName = mem.property.name;
          if (objName === "log" && propName === "print") {
            expr.arguments.forEach((arg) => this.checkExpression(arg));
            return "void";
          }
          if (objName === "gui") {
            if (["fillRect", "strokeRect", "circle", "strokeCircle", "line", "roundRect", "gradient", "text", "textCenter", "color", "clear", "loop", "setup"].includes(propName)) {
              expr.arguments.forEach((arg) => this.checkExpression(arg));
              return "void";
            }
            if (propName === "isKeyPressed") return "bool";
            if (propName === "width" || propName === "height") return "num";
            if (propName === "get_last_key") return "str";
          }
          if (objName === "cli" && propName === "get_key") return "str";
        }
        const objType = this.checkExpression(mem.object);
        if (this.classes.has(objType) && !mem.computed) {
          const propName = mem.property.name;
          const entry = this.classes.get(objType);
          if (entry.properties.has(propName)) return entry.properties.get(propName);
          if (entry.methods.has(propName)) return entry.methods.get(propName).returnType;
        }
        if ((objType === "str" || mem.object.type === "Identifier" && mem.object.name === "string") && !mem.computed) {
          const propName = mem.property.name;
          const strMethods = ["replace", "split", "trim", "length", "upper", "lower", "includes", "indexof"];
          if (strMethods.includes(propName)) {
            expr.arguments.forEach((arg) => this.checkExpression(arg));
            return propName === "length" ? "num" : propName === "includes" ? "bool" : "str";
          }
        }
        if (objType === "list" && !mem.computed) {
          const propName = mem.property.name;
          const listMethods = ["push", "pop", "shift", "unshift", "length", "join", "slice", "splice"];
          if (listMethods.includes(propName)) {
            expr.arguments.forEach((arg) => this.checkExpression(arg));
            return propName === "length" ? "num" : propName === "join" ? "str" : "unknown";
          }
        }
      }
      return "unknown";
    }
    registerClass(node) {
      if (this.classes.has(node.id.name)) {
        throw new TypeError2(`Class '${node.id.name}' is already defined.`, node.line);
      }
      const entry = {
        id: node.id.name,
        properties: /* @__PURE__ */ new Map(),
        methods: /* @__PURE__ */ new Map()
      };
      for (const member of node.members) {
        if (member.type === "ClassProperty") {
          const prop = member;
          entry.properties.set(prop.id.name, prop.typeAnnotation || "unknown");
        } else if (member.type === "ClassMethod") {
          const method = member;
          entry.methods.set(method.id.name, {
            returnType: method.returnType,
            params: method.params.map((p) => p.typeAnnotation)
          });
        }
      }
      this.classes.set(node.id.name, entry);
      const constructor = entry.methods.get("constructor");
      this.defineFunc(node.id.name, node.id.name, constructor ? constructor.params : [], node.line);
    }
    checkClassDeclaration(node) {
      for (const member of node.members) {
        if (member.type === "ClassMethod") {
          this.checkClassMethodBody(member, node.id.name);
        } else if (member.type === "ClassProperty") {
          const prop = member;
          if (prop.init) {
            const initType = this.checkExpression(prop.init);
            if (prop.typeAnnotation && initType !== prop.typeAnnotation && initType !== "unknown") {
              throw new TypeError2(`Property '${prop.id.name}' initialization type mismatch. Expected ${prop.typeAnnotation}, got ${initType}.`, prop.line);
            }
          }
        }
      }
    }
    checkClassMethodBody(node, className) {
      this.pushEnv();
      this.defineVar("this", className, true, node.line);
      for (const param of node.params) {
        this.defineVar(param.id.name, param.typeAnnotation, true, node.line);
      }
      this.checkStatement(node.body, node.returnType);
      this.popEnv();
    }
  };

  // src/compiler/interpreter.ts
  var readline;
  if (typeof process !== "undefined" && process.versions && process.versions.node) {
    readline = __require("readline");
  }
  var ReturnSignal = class {
    constructor(value) {
      this.value = value;
    }
  };
  var Environment = class {
    constructor(parent = null) {
      this.parent = parent;
      this.store = /* @__PURE__ */ new Map();
      this.exports = /* @__PURE__ */ new Set();
    }
    get(name) {
      if (this.store.has(name)) return this.store.get(name);
      if (this.parent) return this.parent.get(name);
      throw new RuntimeError(`Undefined variable '${name}'.`);
    }
    set(name, value) {
      this.store.set(name, value);
    }
    assign(name, value) {
      if (this.store.has(name)) {
        this.store.set(name, value);
        return;
      }
      if (this.parent) {
        this.parent.assign(name, value);
        return;
      }
      this.store.set(name, value);
    }
    has(name) {
      if (this.store.has(name)) return true;
      if (this.parent) return this.parent.has(name);
      return false;
    }
  };
  var RuntimeError = class extends Error {
    constructor(message) {
      super(`RuntimeError: ${message}`);
    }
  };
  var DennerClass = class {
    constructor(declaration, closure) {
      this.declaration = declaration;
      this.closure = closure;
    }
  };
  var DennerInstance = class {
    constructor(klass) {
      this.klass = klass;
      this.fields = /* @__PURE__ */ new Map();
    }
  };
  var DennerFunction = class {
    constructor(params, body, closure) {
      this.params = params;
      this.body = body;
      this.closure = closure;
    }
  };
  var DennerElement = class _DennerElement {
    constructor(tag, attributes, children) {
      this.tag = tag;
      this.attributes = attributes;
      this.children = children;
      this.type = "element";
    }
    toString() {
      const isSelfClosing = ["img", "br", "hr", "input", "meta", "link", "rect", "circle", "image"].includes(this.tag);
      let attrStr = "";
      for (const [k, v] of Object.entries(this.attributes)) {
        if (typeof v === "boolean") {
          if (v) attrStr += ` ${k}`;
        } else {
          attrStr += ` ${k}="${String(v).replace(/"/g, "&quot;")}"`;
        }
      }
      if (isSelfClosing) {
        return `<${this.tag}${attrStr} />`;
      }
      const childStr = this.children.map((c) => {
        if (c instanceof _DennerElement) return c.toString();
        return String(c);
      }).join("");
      return `<${this.tag}${attrStr}>${childStr}</${this.tag}>`;
    }
  };
  var Interpreter = class {
    constructor() {
      this.globalEnv = new Environment();
      this.gui = null;
      this.sdl = null;
      this.nativeCanvas = null;
      this.guiRunning = false;
      this.moduleCache = /* @__PURE__ */ new Map();
      this.setupBuiltins(this.globalEnv);
    }
    // Allow external injection of GUI state (e.g. from Tauri Webview)
    setGuiState(state) {
      this.gui = state;
      this.guiRunning = true;
    }
    createEnvironment() {
      const env = new Environment();
      this.setupBuiltins(env);
      return env;
    }
    // ------------------------------------------------------------------
    // 組み込みオブジェクトを globalEnv に登録 (グローバル変数)
    // ------------------------------------------------------------------
    setupBuiltins(env) {
      env.set("log", {
        print: (val) => {
          const str = (val === void 0 || val === null ? "" : String(val)) + "\n";
          if (typeof process !== "undefined" && process.stdout) {
            process.stdout.write(str);
          } else {
            console.log(str);
          }
        }
      });
      env.set("null", null);
      env.set("undefined", void 0);
    }
    // ------------------------------------------------------------------
    // 標準ライブラリ・モジュールのファクトリ
    // ------------------------------------------------------------------
    createBuiltinModule(name) {
      const self = this;
      switch (name) {
        case "__string__":
          return {
            replace: (s, f, r) => String(s).replace(f, r),
            split: (s, sep) => String(s).split(sep),
            trim: (s) => String(s).trim(),
            length: (s) => String(s).length,
            upper: (s) => String(s).toUpperCase(),
            lower: (s) => String(s).toLowerCase(),
            startswith: (s, p) => String(s).startsWith(p),
            endswith: (s, p) => String(s).endsWith(p),
            starts: (s, p) => String(s).startsWith(p),
            ends: (s, p) => String(s).endsWith(p),
            includes: (s, q) => String(s).includes(q),
            indexof: (s, q) => String(s).indexOf(q),
            substr: (s, start, len) => String(s).substr(start, len),
            substring: (s, start, end) => String(s).substring(start, end),
            charat: (s, i) => String(s).charAt(i),
            repeat: (s, n) => String(s).repeat(n),
            padstart: (s, len, ch) => String(s).padStart(len, ch),
            padend: (s, len, ch) => String(s).padEnd(len, ch)
          };
        case "os":
          return {
            name: () => typeof process !== "undefined" ? process.platform : "browser",
            env: (key) => (typeof process !== "undefined" ? process.env[key] : "") ?? ""
          };
        case "path":
          return {
            join: (...parts) => {
              if (typeof process !== "undefined" && process.versions && process.versions.node) {
                return __require("path").join(...parts);
              }
              return parts.join("/").replace(/\/+/g, "/");
            }
          };
        case "net":
          return {
            get: async (url) => {
              const res = await fetch(url);
              return await res.text();
            },
            serve: (port, handler) => {
              if (typeof process !== "undefined" && process.versions && process.versions.node) {
                const http = __require("http");
                const server = http.createServer(async (req, res) => {
                  try {
                    let responseValue = void 0;
                    if (handler instanceof DennerFunction) {
                      const fnEnv = new Environment(handler.closure);
                      if (handler.params.length > 0) {
                        fnEnv.set(handler.params[0].id.name, req.url);
                      }
                      const result = await self.executeBlock(handler.body, fnEnv);
                      responseValue = result instanceof ReturnSignal ? result.value : void 0;
                    } else if (typeof handler === "function") {
                      responseValue = await handler(req.url);
                    } else {
                      responseValue = handler;
                    }
                    if (responseValue instanceof DennerElement) {
                      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                      res.end(responseValue.toString());
                    } else if (typeof responseValue === "string") {
                      const isHtml = responseValue.trim().startsWith("<") && responseValue.trim().endsWith(">");
                      res.writeHead(200, { "Content-Type": isHtml ? "text/html; charset=utf-8" : "text/plain; charset=utf-8" });
                      res.end(responseValue);
                    } else if (typeof responseValue === "object" && responseValue !== null) {
                      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
                      res.end(JSON.stringify(responseValue));
                    } else {
                      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
                      res.end(String(responseValue ?? ""));
                    }
                  } catch (err) {
                    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
                    res.end(`Denner Server Error: ${err.message}`);
                  }
                });
                server.listen(port, () => {
                  console.log(`\x1B[32m\u{1F680} Denner Server listening on http://localhost:${port}\x1B[0m`);
                });
                return new Promise(() => {
                });
              } else {
                throw new RuntimeError("net.serve is only supported in Node.js environment.");
              }
            }
          };
        case "cli":
          return {
            input: async (prompt) => {
              if (typeof process !== "undefined" && process.versions && process.versions.node) {
                const readline2 = __require("readline");
                return new Promise((resolve) => {
                  const rl = readline2.createInterface({ input: process.stdin, output: process.stdout });
                  rl.question(prompt, (ans) => {
                    rl.close();
                    resolve(ans);
                  });
                });
              } else {
                return window.prompt(prompt) || "";
              }
            },
            get_key: async () => {
              if (self.gui) {
                return new Promise((resolve) => {
                  const check = () => {
                    if (self.gui && self.gui.lastKey) {
                      const k = self.gui.lastKey;
                      self.gui.lastKey = "";
                      resolve(k);
                    } else {
                      setTimeout(check, 10);
                    }
                  };
                  check();
                });
              }
              if (typeof process !== "undefined" && process.stdin.setRawMode) {
                return new Promise((resolve) => {
                  process.stdin.setRawMode(true);
                  process.stdin.once("data", (buf) => {
                    process.stdin.setRawMode(false);
                    resolve(buf.toString("utf8"));
                  });
                });
              }
              return "";
            }
          };
        case "gui":
          return {
            setup: async (w, h) => {
              await self.setupGui(w, h);
            },
            // --- Drawing ---
            clear: (color = "black") => {
              self.guiClear(color || "black");
            },
            color: (c) => {
              if (self.gui) self.gui.ctx.fillStyle = c;
            },
            rect: (x, y, w, h, color) => {
              if (!self.gui) return;
              self.gui.ctx.strokeStyle = color;
              self.gui.ctx.lineWidth = 1;
              self.gui.ctx.strokeRect(x, y, w, h);
            },
            fillRect: (x, y, w, h, color) => {
              if (!self.gui) return;
              if (color) self.gui.ctx.fillStyle = color;
              self.gui.ctx.fillRect(x, y, w, h);
            },
            strokeRect: (x, y, w, h, color, lineWidth = 1) => {
              if (!self.gui) return;
              self.gui.ctx.strokeStyle = color;
              self.gui.ctx.lineWidth = lineWidth;
              self.gui.ctx.strokeRect(x + 0.5, y + 0.5, w, h);
            },
            circle: (x, y, r, color) => {
              if (!self.gui) return;
              const ctx = self.gui.ctx;
              ctx.fillStyle = color;
              ctx.beginPath();
              ctx.arc(x, y, r, 0, Math.PI * 2);
              ctx.fill();
            },
            strokeCircle: (x, y, r, color, lineWidth = 1) => {
              if (!self.gui) return;
              const ctx = self.gui.ctx;
              ctx.strokeStyle = color;
              ctx.lineWidth = lineWidth;
              ctx.beginPath();
              ctx.arc(x, y, r, 0, Math.PI * 2);
              ctx.stroke();
            },
            line: (x1, y1, x2, y2, color, lineWidth = 1) => {
              if (!self.gui) return;
              const ctx = self.gui.ctx;
              ctx.strokeStyle = color;
              ctx.lineWidth = lineWidth;
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.stroke();
            },
            roundRect: (x, y, w, h, r, color) => {
              if (!self.gui) return;
              const ctx = self.gui.ctx;
              ctx.fillStyle = color;
              ctx.beginPath();
              ctx.roundRect(x, y, w, h, r);
              ctx.fill();
            },
            gradient: (x, y, w, h, color1, color2, vertical = true) => {
              if (!self.gui) return;
              const ctx = self.gui.ctx;
              const grad = vertical ? ctx.createLinearGradient(x, y, x, y + h) : ctx.createLinearGradient(x, y, x + w, y);
              grad.addColorStop(0, color1);
              grad.addColorStop(1, color2);
              ctx.fillStyle = grad;
              ctx.fillRect(x, y, w, h);
            },
            image: async (url, x, y, w, h) => await self.guiImage(url, x, y, w, h),
            text: (t, x, y, color, size = 18, font = "monospace") => {
              if (!self.gui) return;
              const ctx = self.gui.ctx;
              ctx.fillStyle = color;
              ctx.font = `${size}px ${font}`;
              ctx.fillText(String(t), x, y);
            },
            textCenter: (t, x, y, color, size = 18) => {
              if (!self.gui) return;
              const ctx = self.gui.ctx;
              ctx.fillStyle = color;
              ctx.font = `bold ${size}px monospace`;
              ctx.textAlign = "center";
              ctx.fillText(String(t), x, y);
              ctx.textAlign = "left";
            },
            // --- Input ---
            isKeyPressed: (key) => {
              if (!self.gui) return false;
              return !!self.gui.pressedKeys?.has(key);
            },
            get_last_key: () => {
              if (!self.gui) return "";
              const k = self.gui.lastKey;
              if (k === "Space") self.gui.lastKey = "";
              return k;
            },
            // --- Canvas Size ---
            width: () => self.gui?.width ?? 800,
            height: () => self.gui?.height ?? 600,
            // --- Advanced ---
            add: async (el) => {
              if (el.tag === "rect") {
                const r = self.guiRect(el.attributes.x || 0, el.attributes.y || 0, el.attributes.w || 50, el.attributes.h || 50, el.attributes.color || "white");
                r.id = String(el.attributes.id || `rect-${Date.now()}`);
                return r;
              } else if (el.tag === "image") {
                const i = await self.guiImage(el.attributes.src || "", el.attributes.x || 0, el.attributes.y || 0, el.attributes.w || 50, el.attributes.h || 50);
                i.id = String(el.attributes.id || `image-${Date.now()}`);
                return i;
              } else {
                throw new RuntimeError(`Unsupported GUI element: ${el.tag}`);
              }
            },
            get_distance: (o1, o2) => {
              if (!o1 || !o2) return 0;
              const dx = o1.x + o1.w / 2 - (o2.x + o2.w / 2);
              const dy = o1.y + o1.h / 2 - (o2.y + o2.h / 2);
              return Math.sqrt(dx * dx + dy * dy);
            },
            // --- Loop ---
            loop: async (callback) => {
              await self.guiLoop(callback);
            }
          };
        default:
          throw new RuntimeError(`Unknown built-in module: ${name}`);
      }
    }
    // ------------------------------------------------------------------
    // GUI 初期化
    // ------------------------------------------------------------------
    async setupGui(w, h) {
      if (this.gui) return;
      if (typeof window !== "undefined" && window.CanvasRenderingContext2D) {
        if (!this.gui) {
          throw new RuntimeError("GUI state not initialized. Call setGuiState first in browser environment.");
        }
        return;
      }
      if (!this.sdl) {
        try {
          this.sdl = __require("@kmamal/sdl");
        } catch {
          throw new RuntimeError("GUI \u3092\u4F7F\u3046\u306B\u306F @kmamal/sdl \u304C\u5FC5\u8981\u3067\u3059\u3002npm install @kmamal/sdl \u3092\u5B9F\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002");
        }
      }
      if (!this.nativeCanvas) {
        try {
          this.nativeCanvas = __require("@napi-rs/canvas");
        } catch {
          throw new RuntimeError("GUI \u3092\u4F7F\u3046\u306B\u306F @napi-rs/canvas \u304C\u5FC5\u8981\u3067\u3059\u3002npm install @napi-rs/canvas \u3092\u5B9F\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002");
        }
      }
      const win = this.sdl.video.createWindow({ title: "Denner", width: w, height: h, resizable: false });
      const canvas = this.nativeCanvas.createCanvas(w, h);
      const ctx = canvas.getContext("2d");
      this.gui = {
        window: win,
        canvas,
        ctx,
        width: w,
        height: h,
        lastKey: "",
        physicsObjects: []
      };
      win.on("keyDown", (e) => {
        if (!this.gui) return;
        const keyStr = String(e.key || e.scancode || "");
        if (!this.gui.pressedKeys) this.gui.pressedKeys = /* @__PURE__ */ new Set();
        const map = {
          "up": "ArrowUp",
          "down": "ArrowDown",
          "left": "ArrowLeft",
          "right": "ArrowRight",
          "Up": "ArrowUp",
          "Down": "ArrowDown",
          "Left": "ArrowLeft",
          "Right": "ArrowRight",
          "space": " ",
          "Space": " "
        };
        const webKey = map[keyStr] || keyStr;
        this.gui.pressedKeys.add(keyStr);
        this.gui.pressedKeys.add(webKey);
        this.gui.lastKey = webKey;
      });
      win.on("keyUp", (e) => {
        if (!this.gui) return;
        const keyStr = String(e.key || e.scancode || "");
        const map = {
          "up": "ArrowUp",
          "down": "ArrowDown",
          "left": "ArrowLeft",
          "right": "ArrowRight",
          "Up": "ArrowUp",
          "Down": "ArrowDown",
          "Left": "ArrowLeft",
          "Right": "ArrowRight",
          "space": " ",
          "Space": " "
        };
        const webKey = map[keyStr] || keyStr;
        this.gui.pressedKeys?.delete(keyStr);
        this.gui.pressedKeys?.delete(webKey);
        this.gui.lastKey = "";
      });
      win.on("close", () => {
        this.guiRunning = false;
      });
    }
    // ------------------------------------------------------------------
    // GUI 描画ヘルパー
    // ------------------------------------------------------------------
    guiClear(color) {
      if (!this.gui) return;
      this.gui.ctx.fillStyle = color;
      this.gui.ctx.fillRect(0, 0, this.gui.width, this.gui.height);
    }
    guiRect(x, y, w, h, color) {
      const obj = { id: `rect-${Date.now()}`, type: "rect", x, y, w, h, vx: 0, vy: 0, physicsEnabled: false, gravity: 0, color };
      if (this.gui) this.gui.physicsObjects.push(obj);
      const self = this;
      obj.enablePhysics = (config) => {
        obj.physicsEnabled = true;
        obj.gravity = typeof config?.gravity === "number" ? config.gravity : 9.8;
        return obj;
      };
      obj.on = (event, cb) => {
        if (event === "collision") obj.onCollision = cb;
        return obj;
      };
      obj.setImage = async (newUrl) => {
        if (self.nativeCanvas) {
          obj.imgData = await self.nativeCanvas.loadImage(newUrl);
          obj.type = "image";
        }
      };
      obj.animate = (type, duration) => {
        obj.animType = type;
        obj.animDuration = duration || 1e3;
        obj.animTimer = obj.animDuration;
        return obj;
      };
      return obj;
    }
    async guiImage(url, x, y, w, h) {
      const obj = { id: `image-${Date.now()}`, type: "image", x, y, w, h, vx: 0, vy: 0, physicsEnabled: false, gravity: 0, color: "" };
      if (this.gui && this.nativeCanvas) {
        try {
          const { loadImage } = this.nativeCanvas;
          obj.imgData = await loadImage(url);
        } catch {
        }
      }
      if (this.gui) this.gui.physicsObjects.push(obj);
      const self = this;
      obj.enablePhysics = (config) => {
        obj.physicsEnabled = true;
        obj.gravity = typeof config?.gravity === "number" ? config.gravity : 9.8;
        return obj;
      };
      obj.on = (event, cb) => {
        if (event === "collision") obj.onCollision = cb;
        return obj;
      };
      obj.setImage = async (newUrl) => {
        if (self.nativeCanvas) {
          obj.imgData = await self.nativeCanvas.loadImage(newUrl);
          obj.type = "image";
        }
      };
      obj.animate = (type, duration) => {
        obj.animType = type;
        obj.animDuration = duration || 1e3;
        obj.animTimer = obj.animDuration;
        return obj;
      };
      return obj;
    }
    guiText(t, x, y, color) {
      if (!this.gui) return;
      const { ctx } = this.gui;
      ctx.fillStyle = color;
      ctx.font = "18px monospace";
      ctx.fillText(String(t), x, y);
    }
    async guiLoop(callback) {
      if (!this.gui) {
        await this.setupGui(800, 600);
      }
      if (!this.gui) return;
      this.guiRunning = true;
      const { window: win } = this.gui;
      if (!this.gui.pressedKeys) {
        this.gui.pressedKeys = /* @__PURE__ */ new Set();
      }
      while (this.guiRunning) {
        if (win && (win.destroyed || win._destroyed)) {
          this.guiRunning = false;
          break;
        }
        if (typeof window !== "undefined" && window.requestAnimationFrame) {
          await new Promise((resolve) => window.requestAnimationFrame(resolve));
        } else {
          await new Promise((resolve) => setTimeout(resolve, 16));
        }
        if (win && (win.destroyed || win._destroyed)) {
          this.guiRunning = false;
          break;
        }
        if (callback) {
          try {
            if (callback instanceof DennerFunction) {
              const cbEnv = new Environment(callback.closure);
              const result = await this.executeBlock(callback.body, cbEnv);
              if (result instanceof ReturnSignal && result.value === false) {
                this.guiRunning = false;
                break;
              }
            } else if (typeof callback === "object" && callback.__boundMethod) {
              const bound = callback;
              const cbEnv = new Environment(bound.__boundMethod.closure);
              cbEnv.set("this", bound.__instance);
              if (bound.__instance instanceof DennerInstance) {
                for (const [k, v] of bound.__instance.fields) {
                  cbEnv.set(k, v);
                }
              }
              const result = await this.executeBlock(bound.__boundMethod.body, cbEnv);
              if (result instanceof ReturnSignal && result.value === false) {
                this.guiRunning = false;
                break;
              }
            } else if (typeof callback === "function") {
              const result = await callback();
              if (result === false) {
                this.guiRunning = false;
                break;
              }
            }
          } catch (e) {
            console.error("guiLoop callback error:", e);
            this.guiRunning = false;
            break;
          }
        } else if (this.gui) {
          const physicsObjects = this.gui.physicsObjects;
          const pressedKeys = this.gui.pressedKeys;
          const player = physicsObjects.find((o) => o.type === "rect" && !o.physicsEnabled);
          if (player) {
            if (pressedKeys.has("Left") || pressedKeys.has("ArrowLeft")) {
              player.vx = -6;
            } else if (pressedKeys.has("Right") || pressedKeys.has("ArrowRight")) {
              player.vx = 6;
            } else {
              player.vx = 0;
            }
            if (player.x < 0) player.x = 0;
            if (player.x + player.w > this.gui.width) player.x = this.gui.width - player.w;
          }
          for (const obj of physicsObjects) {
            if (obj.physicsEnabled) {
              obj.vy += obj.gravity * 0.016;
              if (Math.abs(obj.vy) < 0.1) obj.vy = 0;
              obj.x += obj.vx;
              obj.y += obj.vy;
              if (obj.y + obj.h > this.gui.height) {
                obj.y = this.gui.height - obj.h;
                if (Math.abs(obj.vy) > 0.5) obj.vy *= -0.5;
                else obj.vy = 0;
              }
            } else {
              obj.x += obj.vx;
              obj.y += obj.vy;
            }
          }
          this.guiClear("black");
          for (const obj of physicsObjects) {
            const ctx = this.gui.ctx;
            if (obj.type === "rect") {
              ctx.fillStyle = obj.color;
              ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
            } else if (obj.type === "image" && obj.imgData) {
              ctx.drawImage(obj.imgData, obj.x, obj.y, obj.w, obj.h);
            }
          }
        }
        if (this.gui && win && typeof win.render === "function" && !win.destroyed && !win._destroyed) {
          try {
            const ctx = this.gui.ctx;
            const { data } = ctx.getImageData(0, 0, this.gui.width, this.gui.height);
            if (typeof Buffer !== "undefined") {
              win.render(this.gui.width, this.gui.height, this.gui.width * 4, "rgba32", Buffer.from(data));
            }
          } catch (e) {
            console.error("win.render error:", e);
            this.guiRunning = false;
            break;
          }
        }
      }
      this.gui = null;
    }
    async run(program, moduleLoader, targetEnv = this.globalEnv) {
      this.moduleLoader = moduleLoader;
      for (const stmt of program.body) {
        if (stmt.type === "FunctionDeclaration") {
          const decl = stmt;
          targetEnv.set(decl.id.name, new DennerFunction(decl.params, decl.body, targetEnv));
        } else if (stmt.type === "ClassDeclaration") {
          const decl = stmt;
          targetEnv.set(decl.id.name, new DennerClass(decl, targetEnv));
        } else if (stmt.type === "ExportStatement") {
          const decl = stmt.declaration;
          if (decl.type === "FunctionDeclaration") {
            targetEnv.set(decl.id.name, new DennerFunction(decl.params, decl.body, targetEnv));
          }
        }
      }
      for (const stmt of program.body) {
        await this.execute(stmt, targetEnv);
      }
    }
    // ------------------------------------------------------------------
    // ステートメント実行
    // ------------------------------------------------------------------
    async execute(stmt, env) {
      switch (stmt.type) {
        // --------------------------------------------------------
        case "VariableDeclaration": {
          const decl = stmt;
          const value = await this.evaluate(decl.init, env);
          env.set(decl.id.name, value);
          return;
        }
        // --------------------------------------------------------
        case "FunctionDeclaration": {
          const decl = stmt;
          env.set(decl.id.name, new DennerFunction(decl.params, decl.body, env));
          return;
        }
        // --------------------------------------------------------
        case "ClassDeclaration": {
          const decl = stmt;
          env.set(decl.id.name, new DennerClass(decl, env));
          return;
        }
        // --------------------------------------------------------
        case "ExpressionStatement": {
          const exprStmt = stmt;
          await this.evaluate(exprStmt.expression, env);
          return;
        }
        // --------------------------------------------------------
        case "BlockStatement": {
          const block = stmt;
          const blockEnv = new Environment(env);
          for (const s of block.body) {
            const result = await this.execute(s, blockEnv);
            if (result instanceof ReturnSignal) return result;
          }
          return;
        }
        // --------------------------------------------------------
        case "IfStatement": {
          const ifStmt = stmt;
          const cond = await this.evaluate(ifStmt.test, env);
          if (cond) {
            return this.executeBlock(ifStmt.consequent, env);
          } else if (ifStmt.alternate) {
            if (ifStmt.alternate.type === "IfStatement") {
              return this.execute(ifStmt.alternate, env);
            }
            return this.executeBlock(ifStmt.alternate, env);
          }
          return;
        }
        // --------------------------------------------------------
        case "WhileStatement": {
          const whileStmt = stmt;
          while (await this.evaluate(whileStmt.test, env)) {
            const result = await this.executeBlock(whileStmt.body, env);
            if (result instanceof ReturnSignal) return result;
          }
          return;
        }
        // --------------------------------------------------------
        case "ForRangeStatement": {
          const forRange = stmt;
          const start = await this.evaluate(forRange.start, env);
          const end = await this.evaluate(forRange.end, env);
          for (let i = start; i < end; i++) {
            const loopEnv = new Environment(env);
            loopEnv.set(forRange.iterator.name, i);
            const result = await this.executeBlock(forRange.body, loopEnv);
            if (result instanceof ReturnSignal) return result;
          }
          return;
        }
        // --------------------------------------------------------
        case "ForInStatement": {
          const forIn = stmt;
          const iterable = await this.evaluate(forIn.iterable, env);
          const items = Array.isArray(iterable) ? iterable : Object.entries(iterable);
          for (const item of items) {
            const loopEnv = new Environment(env);
            if (forIn.iterators.length === 1) {
              loopEnv.set(forIn.iterators[0].name, item);
            } else if (forIn.iterators.length === 2 && Array.isArray(item)) {
              loopEnv.set(forIn.iterators[0].name, item[0]);
              loopEnv.set(forIn.iterators[1].name, item[1]);
            }
            const result = await this.executeBlock(forIn.body, loopEnv);
            if (result instanceof ReturnSignal) return result;
          }
          return;
        }
        // --------------------------------------------------------
        case "ReturnStatement": {
          const ret = stmt;
          const value = ret.argument ? await this.evaluate(ret.argument, env) : void 0;
          return new ReturnSignal(value);
        }
        // --------------------------------------------------------
        case "ImportStatement": {
          const imp = stmt;
          const builtins = ["gui", "net", "os", "path", "cli", "string"];
          if (builtins.includes(imp.source)) {
            const modObj = this.createBuiltinModule(imp.source);
            if (imp.alias) {
              env.set(imp.alias, modObj);
            } else {
              env.set(imp.source, modObj);
            }
            return;
          }
          if (!this.moduleLoader) {
            throw new RuntimeError(`Module loader not provided for import '${imp.source}'`);
          }
          let modEnv = this.moduleCache.get(imp.source);
          if (!modEnv) {
            modEnv = await this.moduleLoader(imp.source);
            this.moduleCache.set(imp.source, modEnv);
          }
          if (imp.alias) {
            env.set(imp.alias, modEnv.store);
          } else {
            modEnv.exports.forEach((key) => {
              env.set(key, modEnv.store.get(key));
            });
          }
          return;
        }
        case "ExportStatement": {
          const exp = stmt;
          await this.execute(exp.declaration, env);
          env.exports.add(exp.declaration.id.name);
          return;
        }
        default:
          throw new RuntimeError(`Unknown statement type: ${stmt.type}`);
      }
    }
    async executeBlock(block, parentEnv) {
      const blockEnv = new Environment(parentEnv);
      for (const s of block.body) {
        const result = await this.execute(s, blockEnv);
        if (result instanceof ReturnSignal) return result;
      }
    }
    // ------------------------------------------------------------------
    // 式評価
    // ------------------------------------------------------------------
    async evaluate(expr, env) {
      switch (expr.type) {
        // --------------------------------------------------------
        case "NumberLiteral":
          return expr.value;
        // --------------------------------------------------------
        case "StringLiteral":
          return expr.value;
        // --------------------------------------------------------
        case "BooleanLiteral":
          return expr.value;
        // --------------------------------------------------------
        case "Identifier": {
          const id = expr;
          return env.get(id.name);
        }
        // --------------------------------------------------------
        case "UnaryExpression": {
          const un = expr;
          const val = await this.evaluate(un.argument, env);
          if (un.operator === "-") return -val;
          if (un.operator === "!" || un.operator === "not") return !val;
          if (un.operator === "+") return +val;
          throw new RuntimeError(`Unknown unary operator: ${un.operator}`);
        }
        // --------------------------------------------------------
        case "ElementLiteral": {
          const el = expr;
          const attrs = {};
          for (const [k, v] of Object.entries(el.attributes)) {
            attrs[k] = await this.evaluate(v, env);
          }
          const children = [];
          for (const childNode of el.children) {
            children.push(await this.evaluate(childNode, env));
          }
          return new DennerElement(el.tag, attrs, children);
        }
        // --------------------------------------------------------
        case "BinaryExpression": {
          const bin = expr;
          const left = await this.evaluate(bin.left, env);
          const right = await this.evaluate(bin.right, env);
          switch (bin.operator) {
            case "+":
              if (typeof left === "string" || typeof right === "string") return String(left) + String(right);
              return left + right;
            case "-":
              return left - right;
            case "*":
              return left * right;
            case "/":
              return left / right;
            case "%":
              return left % right;
            case "==":
              return left === right;
            case "!=":
              return left !== right;
            case "<":
              return left < right;
            case ">":
              return left > right;
            case "<=":
              return left <= right;
            case ">=":
              return left >= right;
            case "&&":
            case "and":
              return left && right;
            case "||":
            case "or":
              return left || right;
            default:
              throw new RuntimeError(`Unknown binary operator: ${bin.operator}`);
          }
        }
        // --------------------------------------------------------
        case "AssignmentExpression": {
          const assign = expr;
          const value = await this.evaluate(assign.right, env);
          if (assign.left.type === "Identifier") {
            const name = assign.left.name;
            if (env.has(name)) {
              env.assign(name, value);
            } else {
              env.set(name, value);
            }
          } else if (assign.left.type === "MemberExpression") {
            const mem = assign.left;
            const obj = await this.evaluate(mem.object, env);
            let prop;
            if (mem.computed) {
              prop = await this.evaluate(mem.property, env);
            } else {
              prop = mem.property.name;
            }
            if (obj instanceof DennerInstance) {
              obj.fields.set(String(prop), value);
            } else if (obj && typeof obj === "object") {
              obj[prop] = value;
            }
          }
          return value;
        }
        // --------------------------------------------------------
        case "MemberExpression": {
          const mem = expr;
          const obj = await this.evaluate(mem.object, env);
          let prop;
          if (mem.computed) {
            prop = await this.evaluate(mem.property, env);
          } else {
            prop = mem.property.name;
          }
          if (obj instanceof DennerInstance) {
            if (obj.fields.has(String(prop))) return obj.fields.get(String(prop));
            const method = obj.klass.declaration.members.find(
              (m) => m.type === "ClassMethod" && m.id.name === String(prop)
            );
            if (method) {
              const fn = new DennerFunction(method.params, method.body, obj.klass.closure);
              return { __boundMethod: fn, __instance: obj };
            }
            throw new RuntimeError(`Property '${prop}' does not exist on instance.`);
          }
          if (obj instanceof Map) {
            if (obj.has(prop)) return obj.get(prop);
            throw new RuntimeError(`Property '${prop}' does not exist on module.`);
          }
          if (obj && typeof obj === "object") {
            const val = obj[prop];
            if (val !== void 0) return val;
          }
          throw new RuntimeError(`Cannot access property '${prop}' on ${typeof obj}.`);
        }
        // --------------------------------------------------------
        case "CallExpression": {
          const call = expr;
          return this.evalCallExpression(call, env);
        }
        // --------------------------------------------------------
        case "ObjectLiteral": {
          const obj = expr;
          const result = {};
          for (const prop of obj.properties) {
            result[prop.key] = await this.evaluate(prop.value, env);
          }
          return result;
        }
        // --------------------------------------------------------
        case "ListLiteral": {
          const list = expr;
          const elements = [];
          for (const el of list.elements) {
            elements.push(await this.evaluate(el, env));
          }
          return elements;
        }
        // --------------------------------------------------------
        case "FunctionExpression": {
          const func = expr;
          return new DennerFunction(func.params, func.body, env);
        }
        // --------------------------------------------------------
        default:
          throw new RuntimeError(`Unknown expression type: ${expr.type}`);
      }
    }
    // ------------------------------------------------------------------
    // CallExpression の評価（複雑なので分離）
    // ------------------------------------------------------------------
    async evalCallExpression(call, env) {
      if (call.callee.type === "MemberExpression") {
        const mem = call.callee;
        const obj = await this.evaluate(mem.object, env);
        let prop;
        if (mem.computed) {
          prop = await this.evaluate(mem.property, env);
        } else {
          prop = mem.property.name;
        }
        const propStr = String(prop);
        if (obj instanceof DennerInstance) {
          const method = obj.klass.declaration.members.find(
            (m) => m.type === "ClassMethod" && m.id.name === prop
          );
          if (!method) throw new RuntimeError(`Method '${prop}' does not exist.`);
          const args2 = await Promise.all(call.arguments.map((a) => this.evaluate(a, env)));
          const methodEnv = new Environment(obj.klass.closure);
          methodEnv.set("this", obj);
          for (let i = 0; i < method.params.length; i++) {
            methodEnv.set(method.params[i].id.name, args2[i]);
          }
          const result = await this.executeBlock(method.body, methodEnv);
          if (result instanceof ReturnSignal) return result.value;
          return void 0;
        }
        if (typeof obj === "string") {
          if (prop === "length") return obj.length;
          const strMod = this.createBuiltinModule("__string__");
          if (typeof strMod[prop] === "function") {
            const args2 = await Promise.all(call.arguments.map((a) => this.evaluate(a, env)));
            return strMod[prop](obj, ...args2);
          }
        } else if (Array.isArray(obj)) {
          if (prop === "length") return obj.length;
        }
        if (obj !== null && obj !== void 0 && typeof obj[prop] === "function") {
          const args2 = await Promise.all(call.arguments.map((a) => this.evaluate(a, env)));
          return await obj[prop](...args2);
        }
      }
      const callee = await this.evaluate(call.callee, env);
      const args = await Promise.all(call.arguments.map((a) => this.evaluate(a, env)));
      if (callee instanceof DennerClass) {
        const instance = new DennerInstance(callee);
        for (const member of callee.declaration.members) {
          if (member.type === "ClassProperty") {
            const prop = member;
            let initVal;
            if (prop.init) {
              initVal = await this.evaluate(prop.init, callee.closure);
            } else {
              const t = prop.typeAnnotation;
              if (t === "num") initVal = 0;
              else if (t === "str") initVal = "";
              else if (t === "bool") initVal = false;
              else initVal = void 0;
            }
            instance.fields.set(prop.id.name, initVal);
          }
        }
        const ctor = callee.declaration.members.find(
          (m) => m.type === "ClassMethod" && m.id.name === "constructor"
        );
        if (ctor) {
          const ctorEnv = new Environment(callee.closure);
          ctorEnv.set("this", instance);
          for (let i = 0; i < ctor.params.length; i++) {
            ctorEnv.set(ctor.params[i].id.name, args[i]);
          }
          for (const [k, v] of instance.fields) ctorEnv.set(k, v);
          await this.executeBlock(ctor.body, ctorEnv);
          for (const member of callee.declaration.members) {
            if (member.type === "ClassProperty") {
              const fieldName = member.id.name;
              if (ctorEnv.has(fieldName)) {
                instance.fields.set(fieldName, ctorEnv.get(fieldName));
              }
            }
          }
        }
        return instance;
      }
      if (callee instanceof DennerFunction) {
        const fnEnv = new Environment(callee.closure);
        for (let i = 0; i < callee.params.length; i++) {
          fnEnv.set(callee.params[i].id.name, args[i]);
        }
        const result = await this.executeBlock(callee.body, fnEnv);
        if (result instanceof ReturnSignal) return result.value;
        return void 0;
      }
      if (callee && callee.__boundMethod) {
        const { __boundMethod: fn, __instance: inst } = callee;
        const fnEnv = new Environment(fn.closure);
        fnEnv.set("this", inst);
        for (const [k, v] of inst.fields) fnEnv.set(k, v);
        const fnDecl = fn;
        for (let i = 0; i < fnDecl.params.length; i++) {
          fnEnv.set(fnDecl.params[i].id.name, args[i]);
        }
        const result = await this.executeBlock(fnDecl.body, fnEnv);
        if (result instanceof ReturnSignal) return result.value;
        return void 0;
      }
      if (typeof callee === "function") {
        return await callee(...args);
      }
      throw new RuntimeError(`'${JSON.stringify(call.callee)}' is not callable.`);
    }
  };

  // src/compiler/jscodegen.ts
  var JSCodeGenerator = class _JSCodeGenerator {
    constructor(ast) {
      this.ast = ast;
      this.indentLevel = 0;
      this.output = "";
      this.observedVars = /* @__PURE__ */ new Set();
      this.classNames = /* @__PURE__ */ new Set();
      for (const stmt of ast.body) {
        if (stmt.type === "ClassDeclaration") {
          this.classNames.add(stmt.id.name);
        }
      }
    }
    generate() {
      for (const stmt of this.ast.body) {
        if (stmt.type !== "ImportStatement" && stmt.type !== "ExportStatement") {
          this.generateStatement(stmt);
        } else if (stmt.type === "ExportStatement") {
          this.generateStatement(stmt.declaration);
        }
      }
      return this.output;
    }
    generatePackage() {
      let functions = {};
      let mainOutput = "";
      let stateOut = [];
      const originalEmit = this.emit;
      for (const stmt of this.ast.body) {
        if (stmt.type === "ImportStatement") continue;
        let targetStmt = stmt;
        if (stmt.type === "ExportStatement") {
          targetStmt = stmt.declaration;
        }
        this.output = "";
        this.indentLevel = 0;
        if (targetStmt.type === "FunctionDeclaration") {
          const decl = targetStmt;
          this.generateStatement(targetStmt);
          functions[decl.id.name] = this.output;
        } else if (targetStmt.type === "VariableDeclaration" && targetStmt.isObserved) {
          const decl = targetStmt;
          this.generateStatement(targetStmt);
          stateOut.push(decl.id.name);
          mainOutput += this.output;
        } else {
          this.generateStatement(targetStmt);
          mainOutput += this.output;
        }
      }
      this.output = mainOutput;
      return { functions, main: mainOutput, state: stateOut };
    }
    emit(line) {
      if (line === "") {
        this.output += "\n";
      } else {
        this.output += "    ".repeat(this.indentLevel) + line + "\n";
      }
    }
    indent() {
      this.indentLevel++;
    }
    dedent() {
      this.indentLevel--;
    }
    generateStatement(stmt) {
      switch (stmt.type) {
        case "VariableDeclaration": {
          const decl = stmt;
          const init = this.generateExpression(decl.init);
          if (decl.isObserved) {
            this.observedVars.add(decl.id.name);
            this.emit(`denner_state.${decl.id.name} = ${init};`);
          } else {
            this.emit(`let ${decl.id.name} = ${init};`);
          }
          break;
        }
        case "FunctionDeclaration": {
          const decl = stmt;
          const params = decl.params.map((p) => p.id.name).join(", ");
          this.emit(`function ${decl.id.name}(${params}) {`);
          this.indent();
          decl.body.body.forEach((s) => this.generateStatement(s));
          this.dedent();
          this.emit(`}`);
          this.emit("");
          break;
        }
        case "ExpressionStatement": {
          const expr = stmt.expression;
          this.emit(`${this.generateExpression(expr)};`);
          break;
        }
        case "IfStatement": {
          const ifStmt = stmt;
          this.emit(`if (${this.generateExpression(ifStmt.test)}) {`);
          this.indent();
          ifStmt.consequent.body.forEach((s) => this.generateStatement(s));
          this.dedent();
          if (ifStmt.alternate) {
            if (ifStmt.alternate.type === "IfStatement") {
              this.emit(`} else {`);
              this.indent();
              this.generateStatement(ifStmt.alternate);
              this.dedent();
            } else {
              this.emit(`} else {`);
              this.indent();
              ifStmt.alternate.body.forEach((s) => this.generateStatement(s));
              this.dedent();
            }
          }
          this.emit(`}`);
          break;
        }
        case "WhileStatement": {
          const whileStmt = stmt;
          const test = this.generateExpression(whileStmt.test);
          this.emit(`while (${test}) {`);
          this.indent();
          whileStmt.body.body.forEach((s) => this.generateStatement(s));
          this.dedent();
          this.emit(`}`);
          break;
        }
        case "ForRangeStatement": {
          const forRange = stmt;
          const start = this.generateExpression(forRange.start);
          const end = this.generateExpression(forRange.end);
          const iter = forRange.iterator.name;
          this.emit(`for (let ${iter} = ${start}; ${iter} < ${end}; ${iter}++) {`);
          this.indent();
          forRange.body.body.forEach((s) => this.generateStatement(s));
          this.dedent();
          this.emit(`}`);
          break;
        }
        case "ForInStatement": {
          const forIn = stmt;
          const iter = forIn.iterators[0].name;
          const iterable = this.generateExpression(forIn.iterable);
          this.emit(`for (let ${iter} of ${iterable}) {`);
          this.indent();
          for (const s of forIn.body.body) this.generateStatement(s);
          this.dedent();
          this.emit(`}`);
          break;
        }
        case "ClassDeclaration": {
          const decl = stmt;
          this.emit(`class ${decl.id.name} {`);
          this.indent();
          for (const member of decl.members) {
            if (member.type === "ClassProperty") {
              const prop = member;
              const init = prop.init ? ` = ${this.generateExpression(prop.init)}` : "";
              this.emit(`${prop.id.name}${init};`);
            } else if (member.type === "ClassMethod") {
              const method = member;
              const params = method.params.map((p) => p.id.name).join(", ");
              this.emit(`${method.id.name}(${params}) {`);
              this.indent();
              for (const s of method.body.body) this.generateStatement(s);
              this.dedent();
              this.emit(`}`);
            }
          }
          this.dedent();
          this.emit(`}`);
          this.emit("");
          break;
        }
        case "ReturnStatement": {
          const ret = stmt;
          if (!ret.argument) {
            this.emit(`return;`);
          } else {
            this.emit(`return ${this.generateExpression(ret.argument)};`);
          }
          break;
        }
        case "BlockStatement": {
          this.emit(`{`);
          this.indent();
          stmt.body.forEach((s) => this.generateStatement(s));
          this.dedent();
          this.emit(`}`);
          break;
        }
      }
    }
    generateExpression(expr) {
      switch (expr.type) {
        case "Identifier": {
          const name = expr.name;
          if (this.observedVars.has(name)) return `denner_state.${name}`;
          return name;
        }
        case "NumberLiteral":
          return expr.value.toString();
        case "StringLiteral":
          return JSON.stringify(expr.value);
        case "BooleanLiteral":
          return expr.value ? "true" : "false";
        case "BinaryExpression": {
          const bin = expr;
          let op = bin.operator;
          if (op === "and") op = "&&";
          if (op === "or") op = "||";
          if (op === "..") throw new Error("Range operator cannot be used as a plain expression in JS");
          return `(${this.generateExpression(bin.left)} ${op} ${this.generateExpression(bin.right)})`;
        }
        case "AssignmentExpression": {
          const assign = expr;
          if (assign.left.type === "Identifier") {
            const name = assign.left.name;
            if (this.observedVars.has(name)) {
              return `denner_state.${name} = ${this.generateExpression(assign.right)}`;
            }
            const prefix = assign.isDeclaration ? `let ` : "";
            return `${prefix}${name} = ${this.generateExpression(assign.right)}`;
          }
          const mem = assign.left;
          const obj = this.generateExpression(mem.object);
          const prop = mem.computed ? `[${this.generateExpression(mem.property)}]` : `.${mem.property.name}`;
          return `${obj}${prop} = ${this.generateExpression(assign.right)}`;
        }
        case "CallExpression": {
          const call = expr;
          const args = call.arguments.map((a) => this.generateExpression(a)).join(", ");
          if (call.callee.type === "Identifier") {
            const calleeId = call.callee.name;
            if (this.classNames.has(calleeId)) {
              return `new ${calleeId}(${args})`;
            }
          }
          if (call.callee.type === "MemberExpression") {
            const mem = call.callee;
            if (!mem.computed) {
              const propName = mem.property.name;
              if (propName === "length") {
                const obj = this.generateExpression(mem.object);
                return `${obj}.length`;
              }
              if (mem.object.type === "Identifier") {
                const objName = mem.object.name;
                if (objName === "log" && propName === "print") {
                  if (call.arguments.length === 0) return `denner_system_print("")`;
                  return `denner_system_print(${args})`;
                }
                if (["os", "path", "net", "cli", "gui"].includes(objName)) {
                  let callStr = `denner.${objName}.${propName}(${args})`;
                  if (objName === "net" || objName === "cli" && (propName === "input" || propName === "get_key") || objName === "gui" && propName === "loop") {
                    return `(await ${callStr})`;
                  }
                  return callStr;
                }
              }
            }
          }
          return `${this.generateExpression(call.callee)}(${args})`;
        }
        case "MemberExpression": {
          const mem = expr;
          const obj = this.generateExpression(mem.object);
          if (mem.computed) {
            return `${obj}[${this.generateExpression(mem.property)}]`;
          } else {
            return `${obj}.${mem.property.name}`;
          }
        }
        case "ObjectLiteral": {
          const obj = expr;
          const props = obj.properties.map((p) => `${p.key}: ${this.generateExpression(p.value)}`).join(", ");
          return `{ ${props} }`;
        }
        case "FunctionExpression": {
          const func = expr;
          const params = func.params.map((p) => p.id.name).join(", ");
          const subGen = new _JSCodeGenerator({ type: "Program", body: func.body.body, line: func.line });
          this.observedVars.forEach((v) => subGen.observedVars.add(v));
          this.classNames.forEach((v) => subGen.classNames.add(v));
          const body = subGen.generate().split("\n").map((l) => "  " + l).join("\n");
          return `function(${params}) {
${body}
}`;
        }
        case "ListLiteral": {
          const list = expr;
          const elements = list.elements.map((e) => this.generateExpression(e)).join(", ");
          return `[${elements}]`;
        }
        case "UnaryExpression": {
          const un = expr;
          let op = un.operator;
          if (op === "not") op = "!";
          return `(${op}${this.generateExpression(un.argument)})`;
        }
        case "ElementLiteral": {
          const el = expr;
          const attrsStr = Object.entries(el.attributes).map(([k, v]) => `'${k}': ${this.generateExpression(v)}`).join(", ");
          const chillStr = el.children.map((c) => this.generateExpression(c)).join(", ");
          return `new DennerElement("${el.tag}", {${attrsStr}}, [${chillStr}])`;
        }
      }
      throw new Error(`Unknown expression type: ${expr.type}`);
    }
  };

  // src/resolver/index.ts
  var fs;
  var path;
  var https;
  if (typeof process !== "undefined" && process.versions && process.versions.node) {
    fs = __require("fs");
    path = __require("path");
    https = __require("https");
  }
  var BUILTIN_MODULES = /* @__PURE__ */ new Set(["gui", "cli", "string", "list", "net", "os", "path"]);
  var Resolver = class {
    // resolved path -> source code
    constructor() {
      this.cacheDir = null;
      this.visited = /* @__PURE__ */ new Set();
      this.modules = /* @__PURE__ */ new Map();
      if (fs && path) {
        this.cacheDir = path.join(process.cwd(), ".denner_cache");
        if (!fs.existsSync(this.cacheDir)) {
          fs.mkdirSync(this.cacheDir);
        }
      }
    }
    async resolve(sourcePath, basePath = "") {
      if (BUILTIN_MODULES.has(sourcePath)) {
        return;
      }
      const isUrl = sourcePath.startsWith("http://") || sourcePath.startsWith("https://");
      let absolutePath = "";
      if (isUrl) {
        absolutePath = sourcePath;
      } else {
        if (path) {
          absolutePath = path.resolve(basePath, sourcePath);
          if (!fs.existsSync(absolutePath) && !absolutePath.endsWith(".den")) {
            const denPath = absolutePath + ".den";
            if (fs.existsSync(denPath)) {
              absolutePath = denPath;
            }
          }
        } else {
          absolutePath = sourcePath;
        }
      }
      if (this.visited.has(absolutePath)) {
        return;
      }
      this.visited.add(absolutePath);
      let sourceCode = "";
      if (isUrl) {
        sourceCode = await this.fetchUrl(absolutePath);
      } else {
        if (fs) {
          if (!fs.existsSync(absolutePath)) {
            throw new Error(`Cannot find local module: "${absolutePath}"`);
          }
          sourceCode = fs.readFileSync(absolutePath, "utf8");
        } else {
          const res = await fetch(absolutePath);
          sourceCode = await res.text();
        }
      }
      this.modules.set(absolutePath, sourceCode);
      const importRegex = /^(?!\s*\/\/).*import\s+"([^"]+)"/gm;
      let match;
      while ((match = importRegex.exec(sourceCode)) !== null) {
        const depPath = match[1];
        let newBasePath = "";
        if (isUrl) {
          newBasePath = new URL(".", absolutePath).href;
        } else if (path) {
          newBasePath = path.dirname(absolutePath);
        }
        await this.resolve(depPath, newBasePath);
      }
    }
    async fetchUrl(url) {
      if (typeof fetch !== "undefined") {
        const res = await fetch(url);
        return await res.text();
      }
      if (fs && path && https && this.cacheDir) {
        const urlHash = typeof btoa !== "undefined" ? btoa(encodeURIComponent(url)).replace(/\W/g, "") : Buffer.from(url).toString("base64").replace(/\W/g, "");
        const cacheFile = path.join(this.cacheDir, urlHash + ".den");
        if (fs.existsSync(cacheFile)) {
          return fs.readFileSync(cacheFile, "utf8");
        }
        return new Promise((resolve, reject) => {
          https.get(url, (res) => {
            let data = "";
            res.on("data", (chunk) => data += chunk);
            res.on("end", () => {
              if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                fs.writeFileSync(cacheFile, data);
                resolve(data);
              } else {
                reject(new Error(`Failed to fetch "${url}": ${res.statusCode}`));
              }
            });
          }).on("error", reject);
        });
      }
      throw new Error("No network implementation available.");
    }
  };
  return __toCommonJS(browser_entry_exports);
})();
