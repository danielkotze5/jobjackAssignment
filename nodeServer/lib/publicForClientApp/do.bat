SET /A XCOUNT=0
:loop
mkdir %XCOUNT%
SET /A XCOUNT+=1
echo %XCOUNT%
IF "%XCOUNT%" == "10" (
  GOTO end
) ELSE (
  GOTO loop
)
:end