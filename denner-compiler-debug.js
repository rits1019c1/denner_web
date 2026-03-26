var DennerBundle = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
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
        TokenType2["TYPE_NUM"] = "TYPE_NUM";
        TokenType2["TYPE_STR"] = "TYPE_STR";
        TokenType2["TYPE_BOOL"] = "TYPE_BOOL";
        TokenType2["TYPE_LIST"] = "TYPE_LIST";
        TokenType2["TYPE_OBJ"] = "TYPE_OBJ";
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
        TokenType2["EQ_EQ"] = "EQ_EQ";
        TokenType2["NOT_EQ"] = "NOT_EQ";
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
        true: "BOOLEAN_LITERAL" /* BOOLEAN_LITERAL */,
        false: "BOOLEAN_LITERAL" /* BOOLEAN_LITERAL */
      };
      TypeKeywords = {
        num: "TYPE_NUM" /* TYPE_NUM */,
        str: "TYPE_STR" /* TYPE_STR */,
        bool: "TYPE_BOOL" /* TYPE_BOOL */,
        list: "TYPE_LIST" /* TYPE_LIST */,
        obj: "TYPE_OBJ" /* TYPE_OBJ */
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
            this.skipWhitespace();
            if (this.position >= this.source.length) break;
            const char = this.peek();
            if (char === "\n") {
              const lastToken = tokens[tokens.length - 1];
              if (lastToken && lastToken.type !== "NEWLINE" /* NEWLINE */) {
                tokens.push(this.createToken("NEWLINE" /* NEWLINE */, "\n"));
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
              tokens.push(this.readNumber());
            } else if (this.isAlpha(char)) {
              tokens.push(this.readIdentifierOrKeyword());
            } else if (char === '"') {
              tokens.push(this.readString());
            } else {
              tokens.push(this.readSymbol());
            }
          }
          tokens.push(this.createToken("EOF" /* EOF */, ""));
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
          while (this.position < this.source.length) {
            const char = this.peek();
            if (char === " " || char === "\r" || char === "	") {
              this.advance();
            } else {
              break;
            }
          }
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
        readNumber() {
          let value = "";
          const startCol = this.column;
          while (this.isDigit(this.peek()) || this.peek() === ".") {
            if (this.peek() === "." && this.peek(1) === ".") {
              break;
            }
            value += this.advance();
          }
          return { type: "NUMBER_LITERAL" /* NUMBER_LITERAL */, value, line: this.line, column: startCol };
        }
        readIdentifierOrKeyword() {
          let value = "";
          const startCol = this.column;
          while (this.isAlphaNumeric(this.peek())) {
            value += this.advance();
          }
          let type = "IDENTIFIER" /* IDENTIFIER */;
          if (Keywords[value]) {
            type = Keywords[value];
          } else if (TypeKeywords[value]) {
            type = TypeKeywords[value];
          }
          return { type, value, line: this.line, column: startCol };
        }
        readString() {
          const startCol = this.column;
          this.advance();
          let value = "";
          while (this.position < this.source.length && this.peek() !== '"') {
            value += this.advance();
          }
          this.advance();
          return { type: "STRING_LITERAL" /* STRING_LITERAL */, value, line: this.line, column: startCol };
        }
        readSymbol() {
          const char = this.peek();
          const startCol = this.column;
          switch (char) {
            case "=":
              this.advance();
              if (this.peek() === "=") {
                this.advance();
                return { type: "EQ_EQ" /* EQ_EQ */, value: "==", line: this.line, column: startCol };
              }
              return { type: "ASSIGN" /* ASSIGN */, value: "=", line: this.line, column: startCol };
            case ":":
              this.advance();
              return { type: "COLON" /* COLON */, value: ":", line: this.line, column: startCol };
            case "{":
              this.advance();
              return { type: "LBRACE" /* LBRACE */, value: "{", line: this.line, column: startCol };
            case "}":
              this.advance();
              return { type: "RBRACE" /* RBRACE */, value: "}", line: this.line, column: startCol };
            case "(":
              this.advance();
              return { type: "LPAREN" /* LPAREN */, value: "(", line: this.line, column: startCol };
            case ")":
              this.advance();
              return { type: "RPAREN" /* RPAREN */, value: ")", line: this.line, column: startCol };
            case "[":
              this.advance();
              return { type: "LBRACKET" /* LBRACKET */, value: "[", line: this.line, column: startCol };
            case "]":
              this.advance();
              return { type: "RBRACKET" /* RBRACKET */, value: "]", line: this.line, column: startCol };
            case ",":
              this.advance();
              return { type: "COMMA" /* COMMA */, value: ",", line: this.line, column: startCol };
            case ".":
              this.advance();
              if (this.peek() === ".") {
                this.advance();
                return { type: "DOT_DOT" /* DOT_DOT */, value: "..", line: this.line, column: startCol };
              }
              return { type: "DOT" /* DOT */, value: ".", line: this.line, column: startCol };
            case "+":
              this.advance();
              return { type: "PLUS" /* PLUS */, value: "+", line: this.line, column: startCol };
            case "-":
              this.advance();
              return { type: "MINUS" /* MINUS */, value: "-", line: this.line, column: startCol };
            case "*":
              this.advance();
              return { type: "STAR" /* STAR */, value: "*", line: this.line, column: startCol };
            case "/":
              this.advance();
              return { type: "SLASH" /* SLASH */, value: "/", line: this.line, column: startCol };
            case ">":
              this.advance();
              return { type: "GT" /* GT */, value: ">", line: this.line, column: startCol };
            case "<":
              this.advance();
              return { type: "LT" /* LT */, value: "<", line: this.line, column: startCol };
            case "!":
              this.advance();
              if (this.peek() === "=") {
                this.advance();
                return { type: "NOT_EQ" /* NOT_EQ */, value: "!=", line: this.line, column: startCol };
              }
              throw new Error(`Unexpected character: ${char} at line ${this.line}`);
            default:
              throw new Error(`Unexpected character: ${char} at line ${this.line}`);
          }
        }
        createToken(type, value) {
          return { type, value, line: this.line, column: this.column };
        }
      };
    }
  });

  // src/compiler/browser-entry.ts
  var browser_entry_exports = {};
  __export(browser_entry_exports, {
    BrowserResolver: () => BrowserResolver,
    JSCodeGenerator: () => JSCodeGenerator,
    Lexer: () => Lexer,
    Parser: () => Parser
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
      this.consume("FUNCTION" /* FUNCTION */, "Expected 'function' after 'export'.");
      const funcDecl = this.parseFunctionDeclaration(true);
      return {
        type: "ExportStatement",
        declaration: funcDecl,
        line
      };
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
            typeAnnotation: this.getTypeString(typeToken.type)
          });
        } while (this.match("COMMA" /* COMMA */));
      }
      this.consume("RPAREN" /* RPAREN */, "Expected ')' after parameters.");
      let returnType = "void";
      if (this.match("COLON" /* COLON */)) {
        const typeToken = this.advance();
        returnType = this.getTypeString(typeToken.type);
      }
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
        typeAnnotation = this.getTypeString(typeToken.type);
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
      const consequent = this.parseBlock();
      let alternate = null;
      if (this.match("ELSE" /* ELSE */)) {
        if (this.match("IF" /* IF */)) {
          alternate = this.parseIfStatement();
        } else {
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
      const argument = this.parseExpression();
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
      return this.parseEquality();
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
      while (this.match("GT" /* GT */) || this.match("LT" /* LT */)) {
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
      let expr = this.parseCall();
      while (this.match("STAR" /* STAR */) || this.match("SLASH" /* SLASH */)) {
        const operator = this.previous().value;
        const right = this.parseCall();
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
          args.push(this.parseExpression());
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
            typeAnnotation = this.getTypeString(this.advance().type);
          }
          params.push({ id: { type: "Identifier", name: id.value, line: id.line }, typeAnnotation });
        } while (this.match("COMMA" /* COMMA */));
      }
      this.consume("RPAREN" /* RPAREN */, "Expected ')' after parameters.");
      let returnType = "void";
      if (this.match("COLON" /* COLON */)) {
        returnType = this.getTypeString(this.advance().type);
      }
      const body = this.parseBlock();
      return { type: "FunctionExpression", params, returnType, body, line };
    }
    parseObjectLiteral() {
      const line = this.previous().line;
      const properties = [];
      while (!this.check("RBRACE" /* RBRACE */) && !this.isAtEnd()) {
        const keyToken = this.consume("IDENTIFIER" /* IDENTIFIER */, "Expected property name.");
        this.consume("COLON" /* COLON */, "Expected ':' after property name.");
        const value = this.parseExpression();
        properties.push({ key: keyToken.value, value, line: keyToken.line });
        if (!this.match("COMMA" /* COMMA */)) break;
      }
      this.consume("RBRACE" /* RBRACE */, "Expected '}' after object literal.");
      return { type: "ObjectLiteral", properties, line };
    }
    parseListLiteral() {
      const line = this.previous().line;
      const elements = [];
      if (!this.check("RBRACKET" /* RBRACKET */)) {
        do {
          elements.push(this.parseExpression());
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
    // --- Utilities ---
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
      this.consume("NEWLINE" /* NEWLINE */, "Expected newline to end statement.");
    }
    error(token, message) {
      return new Error(`[Line ${token.line}] Error at '${token.value}': ${message}`);
    }
    getTypeString(type) {
      switch (type) {
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
        default:
          throw new Error(`Unknown type token: ${type}`);
      }
    }
  };

  // src/compiler/jscodegen.ts
  var JSCodeGenerator = class _JSCodeGenerator {
    constructor(ast) {
      this.ast = ast;
      this.indentLevel = 0;
      this.output = "";
      this.observedVars = /* @__PURE__ */ new Set();
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
          forIn.body.body.forEach((s) => this.generateStatement(s));
          this.dedent();
          this.emit(`}`);
          break;
        }
        case "ReturnStatement": {
          const ret = stmt;
          this.emit(`return ${this.generateExpression(ret.argument)};`);
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
          const leftStr = this.generateExpression(assign.left);
          return `${leftStr} = ${this.generateExpression(assign.right)}`;
        }
        case "CallExpression": {
          const call = expr;
          const args = call.arguments.map((a) => this.generateExpression(a)).join(", ");
          if (call.callee.type === "MemberExpression") {
            const mem = call.callee;
            if (mem.object.type === "Identifier") {
              const objName = mem.object.name;
              const propName = mem.property.name;
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
            } else {
              const obj = this.generateExpression(mem.object);
              const prop = mem.property.name;
              return `${obj}.${prop}(${args})`;
            }
          }
          return `${this.generateExpression(call.callee)}(${args})`;
        }
        case "MemberExpression": {
          const mem = expr;
          return `${this.generateExpression(mem.object)}.${mem.property.name}`;
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
          return `(${un.operator}${this.generateExpression(un.argument)})`;
        }
      }
      throw new Error(`Unknown expression type: ${expr.type}`);
    }
  };

  // src/compiler/browser-resolver.ts
  var BrowserResolver = class {
    constructor() {
      this.visited = /* @__PURE__ */ new Set();
      this.modules = /* @__PURE__ */ new Map();
    }
    async resolve(sourcePath, basePath = "") {
      const isUrl = sourcePath.startsWith("http://") || sourcePath.startsWith("https://");
      let absolutePath;
      try {
        absolutePath = isUrl ? sourcePath : new URL(sourcePath, basePath).href;
      } catch (e) {
        throw new Error(`Invalid URL or path: ${sourcePath}`);
      }
      if (this.visited.has(absolutePath)) return;
      this.visited.add(absolutePath);
      const response = await fetch(absolutePath);
      if (!response.ok) throw new Error(`Failed to fetch ${absolutePath}: ${response.status}`);
      const sourceCode = await response.text();
      this.modules.set(absolutePath, sourceCode);
      const importRegex = /import\s+"([^"]+)"/g;
      let match;
      while ((match = importRegex.exec(sourceCode)) !== null) {
        const depPath = match[1];
        const nextBase = new URL(".", absolutePath).href;
        await this.resolve(depPath, nextBase);
      }
    }
    getFullSource(rootSource) {
      let fullSource = "";
      for (const [path, source] of this.modules.entries()) {
        fullSource += `
// --- module: ${path} ---
${source}
`;
      }
      fullSource += `
// --- root code ---
${rootSource}
`;
      return fullSource;
    }
  };

  // src/compiler/browser-entry.ts
  if (typeof window !== "undefined") {
    window.Denner = { Lexer, Parser, JSCodeGenerator, BrowserResolver };
    window.DennerBundle = { Lexer, Parser, JSCodeGenerator, BrowserResolver };
  }
  return __toCommonJS(browser_entry_exports);
})();
