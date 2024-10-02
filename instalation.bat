cd /d %~dp0
pause 
mkdir "C:\Program Files (x86)\Kronox y Kairos\Contabilidad API"
mkdir "C:\Program Files (x86)\Kronox y Kairos\Contabilidad API\conector_contabilidad"
copy conector_contabilidad "C:\Program Files (x86)\Kronox y Kairos\Contabilidad API\conector_contabilidad"
copy contabilidad-api.exe "C:\Program Files (x86)\Kronox y Kairos\Contabilidad API\contabilidad-api.exe"
copy nssm.exe "C:\Program Files (x86)\Kronox y Kairos\Contabilidad API\nssm.exe"
pause