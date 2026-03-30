"use strict";
var DennerBundle = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // dist/src/compiler/lexer.js
  var require_lexer = __commonJS({
    "dist/src/compiler/lexer.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Lexer = exports.TokenType = void 0;
      var TokenType;
      (function(TokenType2) {
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
      })(TokenType || (exports.TokenType = TokenType = {}));
      var Keywords = {
        function: TokenType.FUNCTION,
        return: TokenType.RETURN,
        if: TokenType.IF,
        else: TokenType.ELSE,
        for: TokenType.FOR,
        in: TokenType.IN,
        import: TokenType.IMPORT,
        export: TokenType.EXPORT,
        as: TokenType.AS,
        while: TokenType.WHILE,
        observe: TokenType.OBSERVE,
        class: TokenType.CLASS,
        this: TokenType.THIS,
        true: TokenType.BOOLEAN_LITERAL,
        false: TokenType.BOOLEAN_LITERAL
      };
      var TypeKeywords = {
        num: TokenType.TYPE_NUM,
        str: TokenType.TYPE_STR,
        bool: TokenType.TYPE_BOOL,
        list: TokenType.TYPE_LIST,
        obj: TokenType.TYPE_OBJ
      };
      var Lexer = class {
        constructor(source) {
          this.position = 0;
          this.line = 1;
          this.column = 1;
          this.source = source;
        }
        tokenize() {
          var _a;
          const tokens = [];
          while (this.position < this.source.length) {
            this.skipWhitespace();
            if (this.position >= this.source.length)
              break;
            const char = this.peek();
            if (char === "\n") {
              const lastToken = tokens[tokens.length - 1];
              if (lastToken && lastToken.type !== TokenType.NEWLINE) {
                tokens.push(this.createToken(TokenType.NEWLINE, "\n"));
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
          tokens.push(this.createToken(TokenType.EOF, ""));
          const cleaned = [];
          for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].type === TokenType.NEWLINE && ((_a = tokens[i + 1]) === null || _a === void 0 ? void 0 : _a.type) === TokenType.EOF) {
              continue;
            }
            cleaned.push(tokens[i]);
          }
          return cleaned;
        }
        peek(offset = 0) {
          if (this.position + offset >= this.source.length)
            return "\0";
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
          return { type: TokenType.NUMBER_LITERAL, value, line: this.line, column: startCol };
        }
        readIdentifierOrKeyword() {
          let value = "";
          const startCol = this.column;
          while (this.isAlphaNumeric(this.peek())) {
            value += this.advance();
          }
          let type = TokenType.IDENTIFIER;
          if (Object.prototype.hasOwnProperty.call(Keywords, value)) {
            type = Keywords[value];
          } else if (Object.prototype.hasOwnProperty.call(TypeKeywords, value)) {
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
          return { type: TokenType.STRING_LITERAL, value, line: this.line, column: startCol };
        }
        readSymbol() {
          const char = this.peek();
          const startCol = this.column;
          switch (char) {
            case "=":
              this.advance();
              if (this.peek() === "=") {
                this.advance();
                return { type: TokenType.EQ_EQ, value: "==", line: this.line, column: startCol };
              }
              return { type: TokenType.ASSIGN, value: "=", line: this.line, column: startCol };
            case ":":
              this.advance();
              return { type: TokenType.COLON, value: ":", line: this.line, column: startCol };
            case "{":
              this.advance();
              return { type: TokenType.LBRACE, value: "{", line: this.line, column: startCol };
            case "}":
              this.advance();
              return { type: TokenType.RBRACE, value: "}", line: this.line, column: startCol };
            case "(":
              this.advance();
              return { type: TokenType.LPAREN, value: "(", line: this.line, column: startCol };
            case ")":
              this.advance();
              return { type: TokenType.RPAREN, value: ")", line: this.line, column: startCol };
            case "[":
              this.advance();
              return { type: TokenType.LBRACKET, value: "[", line: this.line, column: startCol };
            case "]":
              this.advance();
              return { type: TokenType.RBRACKET, value: "]", line: this.line, column: startCol };
            case ",":
              this.advance();
              return { type: TokenType.COMMA, value: ",", line: this.line, column: startCol };
            case ".":
              this.advance();
              if (this.peek() === ".") {
                this.advance();
                return { type: TokenType.DOT_DOT, value: "..", line: this.line, column: startCol };
              }
              return { type: TokenType.DOT, value: ".", line: this.line, column: startCol };
            case "+":
              this.advance();
              return { type: TokenType.PLUS, value: "+", line: this.line, column: startCol };
            case "-":
              this.advance();
              return { type: TokenType.MINUS, value: "-", line: this.line, column: startCol };
            case "*":
              this.advance();
              return { type: TokenType.STAR, value: "*", line: this.line, column: startCol };
            case "/":
              this.advance();
              return { type: TokenType.SLASH, value: "/", line: this.line, column: startCol };
            case ">":
              this.advance();
              return { type: TokenType.GT, value: ">", line: this.line, column: startCol };
            case "<":
              this.advance();
              return { type: TokenType.LT, value: "<", line: this.line, column: startCol };
            case "!":
              this.advance();
              if (this.peek() === "=") {
                this.advance();
                return { type: TokenType.NOT_EQ, value: "!=", line: this.line, column: startCol };
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
      exports.Lexer = Lexer;
    }
  });

  // dist/src/compiler/parser.js
  var require_parser = __commonJS({
    "dist/src/compiler/parser.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Parser = void 0;
      var lexer_1 = require_lexer();
      var Parser = class _Parser {
        constructor(tokens) {
          this.current = 0;
          this.tokens = tokens;
        }
        parse() {
          const statements = [];
          while (!this.isAtEnd()) {
            if (this.match(lexer_1.TokenType.NEWLINE))
              continue;
            statements.push(this.parseStatement());
          }
          return {
            type: "Program",
            body: statements,
            line: 1
          };
        }
        parseStatement() {
          if (this.match(lexer_1.TokenType.EXPORT)) {
            return this.parseExportStatement();
          }
          if (this.match(lexer_1.TokenType.IMPORT)) {
            return this.parseImportStatement();
          }
          if (this.match(lexer_1.TokenType.FUNCTION)) {
            return this.parseFunctionDeclaration();
          }
          if (this.match(lexer_1.TokenType.IF)) {
            return this.parseIfStatement();
          }
          if (this.match(lexer_1.TokenType.FOR)) {
            return this.parseForStatement();
          }
          if (this.match(lexer_1.TokenType.RETURN)) {
            return this.parseReturnStatement();
          }
          if (this.match(lexer_1.TokenType.WHILE)) {
            return this.parseWhileStatement();
          }
          if (this.match(lexer_1.TokenType.CLASS)) {
            return this.parseClassDeclaration();
          }
          if (this.check(lexer_1.TokenType.IDENTIFIER)) {
            const next = this.peek(1).type;
            const isDecl = next === lexer_1.TokenType.COLON || next === lexer_1.TokenType.OBSERVE;
            if (isDecl) {
              return this.parseVariableDeclaration();
            }
          }
          return this.parseExpressionStatement();
        }
        // --- Statement Parsers ---
        parseExportStatement() {
          const line = this.previous().line;
          this.consume(lexer_1.TokenType.FUNCTION, "Expected 'function' after 'export'.");
          const funcDecl = this.parseFunctionDeclaration(true);
          return {
            type: "ExportStatement",
            declaration: funcDecl,
            line
          };
        }
        parseImportStatement() {
          const line = this.previous().line;
          const sourceToken = this.consume(lexer_1.TokenType.STRING_LITERAL, "Expected string literal after 'import'.");
          let alias = null;
          if (this.match(lexer_1.TokenType.AS)) {
            const aliasToken = this.consume(lexer_1.TokenType.IDENTIFIER, "Expected identifier after 'as'.");
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
          const idToken = this.consume(lexer_1.TokenType.IDENTIFIER, "Expected function name.");
          this.consume(lexer_1.TokenType.LPAREN, "Expected '(' after function name.");
          const params = [];
          if (!this.check(lexer_1.TokenType.RPAREN)) {
            do {
              const paramId = this.consume(lexer_1.TokenType.IDENTIFIER, "Expected parameter name.");
              this.consume(lexer_1.TokenType.COLON, "Expected ':' after parameter name.");
              const typeToken = this.advance();
              params.push({
                id: { type: "Identifier", name: paramId.value, line: paramId.line },
                typeAnnotation: this.getTypeString(typeToken)
              });
            } while (this.match(lexer_1.TokenType.COMMA));
          }
          this.consume(lexer_1.TokenType.RPAREN, "Expected ')' after parameters.");
          let returnType = "void";
          if (this.match(lexer_1.TokenType.COLON)) {
            const typeToken = this.advance();
            returnType = this.getTypeString(typeToken);
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
          const idToken = this.consume(lexer_1.TokenType.IDENTIFIER, "Expected variable name.");
          const line = idToken.line;
          let typeAnnotation = null;
          if (this.match(lexer_1.TokenType.COLON)) {
            const typeToken = this.advance();
            typeAnnotation = this.getTypeString(typeToken);
          }
          let isObserved = false;
          if (this.match(lexer_1.TokenType.OBSERVE)) {
            isObserved = true;
          }
          this.consume(lexer_1.TokenType.ASSIGN, "Expected '=' after variable name.");
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
          if (this.match(lexer_1.TokenType.ELSE)) {
            if (this.match(lexer_1.TokenType.IF)) {
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
          iterators.push({ type: "Identifier", name: this.consume(lexer_1.TokenType.IDENTIFIER, "Expected identifier in for loop.").value, line });
          if (this.match(lexer_1.TokenType.COMMA)) {
            iterators.push({ type: "Identifier", name: this.consume(lexer_1.TokenType.IDENTIFIER, "Expected second identifier in for loop.").value, line });
          }
          this.consume(lexer_1.TokenType.IN, "Expected 'in' after for loop identifiers.");
          const exprOrRangeStart = this.parseExpression();
          if (this.match(lexer_1.TokenType.DOT_DOT)) {
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
          this.consume(lexer_1.TokenType.LBRACE, "Expected '{' to start block.");
          const statements = [];
          while (!this.check(lexer_1.TokenType.RBRACE) && !this.isAtEnd()) {
            if (this.match(lexer_1.TokenType.NEWLINE))
              continue;
            statements.push(this.parseStatement());
          }
          this.consume(lexer_1.TokenType.RBRACE, "Expected '}' to end block.");
          this.match(lexer_1.TokenType.NEWLINE);
          return {
            type: "BlockStatement",
            body: statements,
            line
          };
        }
        parseExpressionStatement() {
          const expr = this.parseExpression();
          const line = expr.line;
          if (this.match(lexer_1.TokenType.ASSIGN)) {
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
          while (this.match(lexer_1.TokenType.EQ_EQ) || this.match(lexer_1.TokenType.NOT_EQ)) {
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
          while (this.match(lexer_1.TokenType.GT) || this.match(lexer_1.TokenType.LT)) {
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
          while (this.match(lexer_1.TokenType.PLUS) || this.match(lexer_1.TokenType.MINUS)) {
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
          while (this.match(lexer_1.TokenType.STAR) || this.match(lexer_1.TokenType.SLASH)) {
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
            if (this.match(lexer_1.TokenType.LPAREN)) {
              expr = this.finishCall(expr);
            } else if (this.match(lexer_1.TokenType.DOT)) {
              const name = this.consume(lexer_1.TokenType.IDENTIFIER, "Expected property name after '.'.");
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
          if (!this.check(lexer_1.TokenType.RPAREN)) {
            do {
              args.push(this.parseExpression());
            } while (this.match(lexer_1.TokenType.COMMA));
          }
          const paren = this.consume(lexer_1.TokenType.RPAREN, "Expected ')' after arguments.");
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
            case lexer_1.TokenType.NUMBER_LITERAL:
              return { type: "NumberLiteral", value: parseFloat(token.value), line: token.line };
            case lexer_1.TokenType.STRING_LITERAL:
              return this.parseInterpolatedString(token.value, token.line);
            case lexer_1.TokenType.BOOLEAN_LITERAL:
              return { type: "BooleanLiteral", value: token.value === "true", line: token.line };
            case lexer_1.TokenType.IDENTIFIER:
              return { type: "Identifier", name: token.value, line: token.line };
            case lexer_1.TokenType.THIS:
              return { type: "Identifier", name: "this", line: token.line };
            case lexer_1.TokenType.LPAREN:
              const expr = this.parseExpression();
              this.consume(lexer_1.TokenType.RPAREN, "Expected ')' after expression.");
              return expr;
            case lexer_1.TokenType.LBRACE:
              return this.parseObjectLiteral();
            case lexer_1.TokenType.FUNCTION:
              return this.parseFunctionExpression();
            case lexer_1.TokenType.LBRACKET:
              return this.parseListLiteral();
            case lexer_1.TokenType.MINUS:
            case lexer_1.TokenType.PLUS: {
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
          this.consume(lexer_1.TokenType.LPAREN, "Expected '(' after 'function'.");
          const params = [];
          if (!this.check(lexer_1.TokenType.RPAREN)) {
            do {
              const id = this.consume(lexer_1.TokenType.IDENTIFIER, "Expected parameter name.");
              let typeAnnotation = "any";
              if (this.match(lexer_1.TokenType.COLON)) {
                typeAnnotation = this.getTypeString(this.advance());
              }
              params.push({ id: { type: "Identifier", name: id.value, line: id.line }, typeAnnotation });
            } while (this.match(lexer_1.TokenType.COMMA));
          }
          this.consume(lexer_1.TokenType.RPAREN, "Expected ')' after parameters.");
          let returnType = "void";
          if (this.match(lexer_1.TokenType.COLON)) {
            returnType = this.getTypeString(this.advance());
          }
          const body = this.parseBlock();
          return { type: "FunctionExpression", params, returnType, body, line };
        }
        parseObjectLiteral() {
          const line = this.previous().line;
          const properties = [];
          while (!this.check(lexer_1.TokenType.RBRACE) && !this.isAtEnd()) {
            const keyToken = this.consume(lexer_1.TokenType.IDENTIFIER, "Expected property name.");
            this.consume(lexer_1.TokenType.COLON, "Expected ':' after property name.");
            const value = this.parseExpression();
            properties.push({ key: keyToken.value, value, line: keyToken.line });
            if (!this.match(lexer_1.TokenType.COMMA))
              break;
          }
          this.consume(lexer_1.TokenType.RBRACE, "Expected '}' after object literal.");
          return { type: "ObjectLiteral", properties, line };
        }
        parseListLiteral() {
          const line = this.previous().line;
          const elements = [];
          if (!this.check(lexer_1.TokenType.RBRACKET)) {
            do {
              elements.push(this.parseExpression());
            } while (this.match(lexer_1.TokenType.COMMA));
          }
          this.consume(lexer_1.TokenType.RBRACKET, "Expected ']' after list literal.");
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
            const innerLexer = new (require_lexer()).Lexer(innerSource);
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
          if (this.isAtEnd())
            return false;
          return this.peek().type === type;
        }
        advance() {
          if (!this.isAtEnd())
            this.current++;
          return this.previous();
        }
        isAtEnd() {
          return this.peek().type === lexer_1.TokenType.EOF;
        }
        peek(offset = 0) {
          return this.tokens[this.current + offset];
        }
        previous() {
          return this.tokens[this.current - 1];
        }
        consume(type, message) {
          if (this.check(type))
            return this.advance();
          throw this.error(this.peek(), message);
        }
        consumeStatementEnd() {
          if (this.isAtEnd())
            return;
          if (this.check(lexer_1.TokenType.RBRACE))
            return;
          this.consume(lexer_1.TokenType.NEWLINE, "Expected newline to end statement.");
        }
        error(token, message) {
          return new Error(`[Line ${token.line}] Error at '${token.value}': ${message}`);
        }
        getTypeString(token) {
          switch (token.type) {
            case lexer_1.TokenType.TYPE_NUM:
              return "num";
            case lexer_1.TokenType.TYPE_STR:
              return "str";
            case lexer_1.TokenType.TYPE_BOOL:
              return "bool";
            case lexer_1.TokenType.TYPE_LIST:
              return "list";
            case lexer_1.TokenType.TYPE_OBJ:
              return "obj";
            case lexer_1.TokenType.IDENTIFIER:
              return token.value;
            default:
              throw new Error(`Unknown type token: ${token.type} at line ${token.line}`);
          }
        }
        parseClassDeclaration() {
          const line = this.previous().line;
          const id = this.consume(lexer_1.TokenType.IDENTIFIER, "Expected class name.");
          this.consume(lexer_1.TokenType.LBRACE, "Expected '{' before class body.");
          const members = [];
          while (!this.check(lexer_1.TokenType.RBRACE) && !this.isAtEnd()) {
            while (this.match(lexer_1.TokenType.NEWLINE))
              ;
            if (this.check(lexer_1.TokenType.RBRACE))
              break;
            if (this.match(lexer_1.TokenType.FUNCTION)) {
              members.push(this.parseClassMethod());
            } else if (this.check(lexer_1.TokenType.IDENTIFIER)) {
              members.push(this.parseClassProperty());
            } else {
              throw new Error(`Unexpected token in class body: ${this.peek().value} at line ${this.peek().line}`);
            }
          }
          this.consume(lexer_1.TokenType.RBRACE, "Expected '}' after class body.");
          return {
            type: "ClassDeclaration",
            id: { type: "Identifier", name: id.value, line: id.line },
            members,
            line
          };
        }
        parseClassProperty() {
          const id = this.consume(lexer_1.TokenType.IDENTIFIER, "Expected property name.");
          const line = id.line;
          let typeAnnotation = null;
          if (this.match(lexer_1.TokenType.COLON)) {
            const typeToken = this.advance();
            typeAnnotation = this.getTypeString(typeToken);
          }
          let init = null;
          if (this.match(lexer_1.TokenType.ASSIGN)) {
            init = this.parseExpression();
          }
          if (!this.check(lexer_1.TokenType.RBRACE)) {
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
      exports.Parser = Parser;
    }
  });

  // dist/src/compiler/jscodegen.js
  var require_jscodegen = __commonJS({
    "dist/src/compiler/jscodegen.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.JSCodeGenerator = void 0;
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
              for (const s of forIn.body.body)
                this.generateStatement(s);
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
                  for (const s of method.body.body)
                    this.generateStatement(s);
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
              if (this.observedVars.has(name))
                return `denner_state.${name}`;
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
              if (op === "..")
                throw new Error("Range operator cannot be used as a plain expression in JS");
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
              if (call.callee.type === "Identifier") {
                const calleeId = call.callee.name;
                if (this.classNames.has(calleeId)) {
                  return `new ${calleeId}(${args})`;
                }
              }
              if (call.callee.type === "MemberExpression") {
                const mem = call.callee;
                if (mem.object.type === "Identifier") {
                  const objName = mem.object.name;
                  const propName = mem.property.name;
                  if (objName === "log" && propName === "print") {
                    if (call.arguments.length === 0)
                      return `denner_system_print("")`;
                    return `denner_system_print(${args})`;
                  }
                  if (["os", "path", "net", "cli", "gui"].includes(objName)) {
                    let callStr = `denner.${objName}.${propName}(${args})`;
                    if (objName === "net" || objName === "cli" && (propName === "input" || propName === "get_key") || objName === "gui" && propName === "loop") {
                      return `(await ${callStr})`;
                    }
                    return callStr;
                  }
                  if (objName === "string") {
                    const strMethods = {
                      "replace": "denner_string_replace",
                      "split": "denner_string_split",
                      "trim": "denner_string_trim",
                      "length": "denner_string_length",
                      "upper": "denner_string_upper",
                      "lower": "denner_string_lower",
                      "startswith": "denner_string_starts",
                      "endswith": "denner_string_ends",
                      "includes": "denner_string_includes",
                      "indexof": "denner_string_indexof",
                      "substr": "denner_string_substr",
                      "substring": "denner_string_substring",
                      "charat": "denner_string_charat",
                      "repeat": "denner_string_repeat",
                      "padstart": "denner_string_padstart",
                      "padend": "denner_string_padend",
                      "starts": "denner_string_starts",
                      "ends": "denner_string_ends"
                    };
                    if (strMethods[propName]) {
                      return `${strMethods[propName]}(${args})`;
                    }
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
              return `(${un.operator}${this.generateExpression(un.argument)})`;
            }
          }
          throw new Error(`Unknown expression type: ${expr.type}`);
        }
      };
      exports.JSCodeGenerator = JSCodeGenerator;
    }
  });

  // dist/src/compiler/browser-resolver.js
  var require_browser_resolver = __commonJS({
    "dist/src/compiler/browser-resolver.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BrowserResolver = void 0;
      var BrowserResolver = class {
        constructor() {
          this.visited = /* @__PURE__ */ new Set();
          this.modules = /* @__PURE__ */ new Map();
        }
        resolve(sourcePath_1) {
          return __awaiter(this, arguments, void 0, function* (sourcePath, basePath = "") {
            const isUrl = sourcePath.startsWith("http://") || sourcePath.startsWith("https://");
            let absolutePath;
            try {
              absolutePath = isUrl ? sourcePath : new URL(sourcePath, basePath).href;
            } catch (e) {
              throw new Error(`Invalid URL or path: ${sourcePath}`);
            }
            if (this.visited.has(absolutePath))
              return;
            this.visited.add(absolutePath);
            const response = yield fetch(absolutePath);
            if (!response.ok)
              throw new Error(`Failed to fetch ${absolutePath}: ${response.status}`);
            const sourceCode = yield response.text();
            this.modules.set(absolutePath, sourceCode);
            const importRegex = /import\s+"([^"]+)"/g;
            let match;
            while ((match = importRegex.exec(sourceCode)) !== null) {
              const depPath = match[1];
              const nextBase = new URL(".", absolutePath).href;
              yield this.resolve(depPath, nextBase);
            }
          });
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
      exports.BrowserResolver = BrowserResolver;
    }
  });

  // dist/src/compiler/browser-entry.js
  var require_browser_entry = __commonJS({
    "dist/src/compiler/browser-entry.js"(exports) {
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BrowserResolver = exports.JSCodeGenerator = exports.Parser = exports.Lexer = void 0;
      var lexer_1 = require_lexer();
      Object.defineProperty(exports, "Lexer", { enumerable: true, get: function() {
        return lexer_1.Lexer;
      } });
      var parser_1 = require_parser();
      Object.defineProperty(exports, "Parser", { enumerable: true, get: function() {
        return parser_1.Parser;
      } });
      var jscodegen_1 = require_jscodegen();
      Object.defineProperty(exports, "JSCodeGenerator", { enumerable: true, get: function() {
        return jscodegen_1.JSCodeGenerator;
      } });
      var browser_resolver_1 = require_browser_resolver();
      Object.defineProperty(exports, "BrowserResolver", { enumerable: true, get: function() {
        return browser_resolver_1.BrowserResolver;
      } });
      if (typeof window !== "undefined") {
        window.Denner = { Lexer: lexer_1.Lexer, Parser: parser_1.Parser, JSCodeGenerator: jscodegen_1.JSCodeGenerator, BrowserResolver: browser_resolver_1.BrowserResolver };
        window.DennerBundle = { Lexer: lexer_1.Lexer, Parser: parser_1.Parser, JSCodeGenerator: jscodegen_1.JSCodeGenerator, BrowserResolver: browser_resolver_1.BrowserResolver };
      }
    }
  });
  return require_browser_entry();
})();
