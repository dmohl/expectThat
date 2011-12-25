c:\nuget\nuget.exe pack .\ExpectThat.QUnit.nuspec
md c:\nuget\ExpectThat.QUnit\
copy .\*.nupkg c:\nuget\ExpectThat.QUnit\ /Y
pause